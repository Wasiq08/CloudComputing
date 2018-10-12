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
import { CaseNature } from '../../../core/models/caseNature';
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'caseNature-list',
    templateUrl: 'case.nature.component.html',
    styleUrls: ['../setup.forms.css', '../../admin.component.css']
})
export class CaseNatureComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // caseNature: CaseNature = new CaseNature();
    caseNatures: CaseNature[] = [];
    addStatus = true;
    updateStatus = true;
    deleteStatus = true;
    user: User = new User();

    displayedColumns = ['caseNature', 'action'];
    dataSource = new MatTableDataSource<CaseNature>(this.caseNatures);
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
        this.loadCaseNatureList();
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
        this.loadCaseNatureList();
    }

    loadCaseNatureList() {
        this.isSpinner = true;
        const msg = new Message();
        this._setupService.getCaseNatures().subscribe(
            (res) => {
                this.caseNatures = res.json();
                // console.log(this.caseNatures);
                this.dataSource = new MatTableDataSource<CaseNature>(this.caseNatures);
                this.dataSource.paginator = this.paginator;

                if (this.caseNatures.length == 0) {
                    msg.msg = 'No CaseNatures Found';
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
        const dialogRef = this.dialog.open(AddCaseNatureField, {
            width: '450px',
            data: { field }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseNatureList();
        });
    }

    onEdit(value, caseNature) {
        // console.log('value', value, '---id', id);
        const dialogRef = this.dialog.open(EditCaseNatureField, {
            width: '450px',
            data: { value, caseNature }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseNatureList();
        });
    }

    onDelete(value, id, name) {
        const dialogRef = this.dialog.open(DeleteCaseNatureField, {
            width: '450px',
            data: { value, id, name }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseNatureList();
        });
    }
}


@Component({
    selector: 'add-caseNature',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class AddCaseNatureField {

    title = "Add New Case Nature";
    caseNature: CaseNature = new CaseNature();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<AddCaseNatureField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        // console.log('caseNature', this.caseNature);
        // console.log('data', this.fieldType);
        this.form = fb.group({
            'caseNature': [this.caseNature.caseNature, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseNatureDescription': [this.caseNature.caseNatureDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseNatureTooltip': [this.caseNature.caseNatureTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })

    }

    onCaseNatureFocusOut() {
        this.caseNature.caseNature = (this.caseNature.caseNature && this.caseNature.caseNature.length > 0 ? this.caseNature.caseNature.trim() : this.caseNature.caseNature);
    }

    onCaseNatureDescriptionFocusOut() {
        this.caseNature.caseNatureDescription = (this.caseNature.caseNatureDescription && this.caseNature.caseNatureDescription.length > 0 ? this.caseNature.caseNatureDescription.trim() : this.caseNature.caseNatureDescription);
    }

    onCaseNatureTooltipFocusOut() {
        this.caseNature.caseNatureTooltip = (this.caseNature.caseNatureTooltip && this.caseNature.caseNatureTooltip.length > 0 ? this.caseNature.caseNatureTooltip.trim() : this.caseNature.caseNatureTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.addCaseNature(this.caseNature).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully added an caseNature';
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
    selector: 'edit-caseNature',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class EditCaseNatureField {

    title = "Edit Case Nature";
    caseNature: CaseNature = new CaseNature();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<EditCaseNatureField>,
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

        if (this.fieldType === 'caseNature') {
            // this.caseNature.id = data.id;
            // this.caseNature.caseNatureId = data.id;
            // this.caseNature.caseNature = data.name;
            this.caseNature = data.caseNature;
            
        }
        // console.log('this.caseNature', this.caseNature);

        this.form = fb.group({
            'caseNature': [this.caseNature.caseNature, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseNatureDescription': [this.caseNature.caseNatureDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseNatureTooltip': [this.caseNature.caseNatureTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })
    }

    onCaseNatureFocusOut() {
        this.caseNature.caseNature = (this.caseNature.caseNature && this.caseNature.caseNature.length > 0 ? this.caseNature.caseNature.trim() : this.caseNature.caseNature);
    }

    onCaseNatureDescriptionFocusOut() {
        this.caseNature.caseNatureDescription = (this.caseNature.caseNatureDescription && this.caseNature.caseNatureDescription.length > 0 ? this.caseNature.caseNatureDescription.trim() : this.caseNature.caseNatureDescription);
    }

    onCaseNatureTooltipFocusOut() {
        this.caseNature.caseNatureTooltip = (this.caseNature.caseNatureTooltip && this.caseNature.caseNatureTooltip.length > 0 ? this.caseNature.caseNatureTooltip.trim() : this.caseNature.caseNatureTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.updateCaseNature(this.caseNature).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully updated an caseNature';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close(this.caseNature);
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}



@Component({
    selector: 'delete-caseNature',
    templateUrl: '../../../dialogs/admin.confirm.field.delete.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeleteCaseNatureField {
    fieldType: string;
    id: number;
    name: string;
    constructor(
        public dialogRef: MatDialogRef<DeleteCaseNatureField>,
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
        this._setupService.deleteCaseNature(this.id).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully deleted an caseNature';
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




