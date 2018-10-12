import { Component, Input, OnInit, Inject, Output, EventEmitter, AfterViewInit, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { IAuthService } from '../../../core/services/auth/iauth.service';
import { UIService } from '../../../core/services/ui/ui.service';
import { Message, MessageTypes } from '../../../core/models/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminSetupService } from '../../../core/services/admin/admin.setup.service';
import { CaseTerritory } from '../../../core/models/caseTerritory';
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'caseTerritory-list',
    templateUrl: 'case.territory.component.html',
    styleUrls: ['../setup.forms.css', '../../admin.component.css']
})
export class CaseTerritoryComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // caseTerritory: CaseTerritory = new CaseTerritory();
    caseTerritories: CaseTerritory[] = [];
    addStatus = true;
    updateStatus = true;
    deleteStatus = true;
    user: User = new User();

    displayedColumns = ['caseTerritory', 'action'];
    dataSource = new MatTableDataSource<CaseTerritory>(this.caseTerritories);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isSpinner = false;
    filter: string = "";

    constructor( @Inject('IAuthService')
    private _authService: IAuthService,
        private _uiService: UIService,
        private _router: Router,
        // private utilityService: UtilityService,
        public dialog: MatDialog,
        private activateRoute: ActivatedRoute,
        private _setupService: AdminSetupService,
    ) {

    }

    ngOnInit(): void {
        // Applying permission
        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();
        // this.addStatus = this.utilityService.checkUserPermission(this.user, 'bo_add_records');
        // this.updateStatus = this.utilityService.checkUserPermission(this.user, 'bo_update_records');
        // this.deleteStatus = this.utilityService.checkUserPermission(this.user, 'bo_delete_records');
        this.loadCaseTerritoryList();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    refreshList() {
        this.isSpinner = true;
        this.filter = "";
        this.dataSource.filter = null;
        this.loadCaseTerritoryList();
    }

    loadCaseTerritoryList() {
        this.isSpinner = true;
        const msg = new Message();
        this._setupService.getCaseTerritories().subscribe(
            (res) => {
                this.caseTerritories = res.json();
                // console.log(this.caseTerritories);
                this.dataSource = new MatTableDataSource<CaseTerritory>(this.caseTerritories);
                this.dataSource.paginator = this.paginator;

                if (this.caseTerritories.length == 0) {
                    msg.msg = 'No CaseTerritories Found';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                }
                this.isSpinner = false;
            },
            (err) => {
                console.log(err);
                this.isSpinner = false;
                this._authService.errStatusCheck(err);
            }
        );
    }

    addField(field) {
        const dialogRef = this.dialog.open(AddCaseTerritoryField, {
            width: '450px',
            data: { field }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseTerritoryList();
        });
    }

    onEdit(value, caseTerritory) {
        // console.log('value', value, '---id', id);
        const dialogRef = this.dialog.open(EditCaseTerritoryField, {
            width: '450px',
            data: { value, caseTerritory }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseTerritoryList();
        });
    }

    onDelete(value, id, name) {
        const dialogRef = this.dialog.open(DeleteCaseTerritoryField, {
            width: '450px',
            data: { value, id, name }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseTerritoryList();
        });
    }
}


@Component({
    selector: 'add-caseTerritory',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class AddCaseTerritoryField {

    
    title = "Add New Case Territory";
    caseTerritory: CaseTerritory = new CaseTerritory();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<AddCaseTerritoryField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        // console.log('caseTerritory', this.caseTerritory);
        // console.log('data', this.fieldType);
        this.form = fb.group({
            'caseTerritory': [this.caseTerritory.caseTerritory, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseTerritoryDescription': [this.caseTerritory.caseTerritoryDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseTerritoryTooltip': [this.caseTerritory.caseTerritoryTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })

    }

    onCaseTerritoryFocusOut() {
        this.caseTerritory.caseTerritory = (this.caseTerritory.caseTerritory && this.caseTerritory.caseTerritory.length > 0 ? this.caseTerritory.caseTerritory.trim() : this.caseTerritory.caseTerritory);
    }

    onCaseTerritoryDescriptionFocusOut() {
        this.caseTerritory.caseTerritoryDescription = (this.caseTerritory.caseTerritoryDescription && this.caseTerritory.caseTerritoryDescription.length > 0 ? this.caseTerritory.caseTerritoryDescription.trim() : this.caseTerritory.caseTerritoryDescription);
    }

    onCaseTerritoryTooltipFocusOut() {
        this.caseTerritory.caseTerritoryTooltip = (this.caseTerritory.caseTerritoryTooltip && this.caseTerritory.caseTerritoryTooltip.length > 0 ? this.caseTerritory.caseTerritoryTooltip.trim() : this.caseTerritory.caseTerritoryTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.addCaseTerritory(this.caseTerritory).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully added an caseTerritory';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close();
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}



@Component({
    selector: 'edit-caseTerritory',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class EditCaseTerritoryField {

    title = "Edit Case Territory";
    caseTerritory: CaseTerritory = new CaseTerritory();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<EditCaseTerritoryField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.value;
        // console.log('data', data);

        if (this.fieldType === 'caseTerritory') {
            // this.caseTerritory.id = data.id;
            // this.caseTerritory.caseTerritoryId = data.id;
            // this.caseTerritory.caseTerritory = data.name;
            this.caseTerritory = data.caseTerritory;
        }
        // console.log('this.caseTerritory', this.caseTerritory);

        this.form = fb.group({
            'caseTerritory': [this.caseTerritory.caseTerritory, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseTerritoryDescription': [this.caseTerritory.caseTerritoryDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseTerritoryTooltip': [this.caseTerritory.caseTerritoryTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })
    }

    onCaseTerritoryFocusOut() {
        this.caseTerritory.caseTerritory = (this.caseTerritory.caseTerritory && this.caseTerritory.caseTerritory.length > 0 ? this.caseTerritory.caseTerritory.trim() : this.caseTerritory.caseTerritory);
    }

    onCaseTerritoryDescriptionFocusOut() {
        this.caseTerritory.caseTerritoryDescription = (this.caseTerritory.caseTerritoryDescription && this.caseTerritory.caseTerritoryDescription.length > 0 ? this.caseTerritory.caseTerritoryDescription.trim() : this.caseTerritory.caseTerritoryDescription);
    }

    onCaseTerritoryTooltipFocusOut() {
        this.caseTerritory.caseTerritoryTooltip = (this.caseTerritory.caseTerritoryTooltip && this.caseTerritory.caseTerritoryTooltip.length > 0 ? this.caseTerritory.caseTerritoryTooltip.trim() : this.caseTerritory.caseTerritoryTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.updateCaseTerritory(this.caseTerritory).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully updated an caseTerritory';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close(this.caseTerritory);
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}



@Component({
    selector: 'delete-caseTerritory',
    templateUrl: '../../../dialogs/admin.confirm.field.delete.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeleteCaseTerritoryField {
    fieldType: string;
    id: number;
    name: string;
    constructor(
        public dialogRef: MatDialogRef<DeleteCaseTerritoryField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
    ) {
        this.fieldType = data.value;
        this.id = data.id;
        this.name = data.name;
        // console.log('data', this.fieldType);

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.deleteCaseTerritory(this.id).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully deleted an caseTerritory';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close();
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }
}




