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
import { CaseType } from '../../../core/models/caseType';
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'caseType-list',
    templateUrl: 'case.type.component.html',
    styleUrls: ['../setup.forms.css', '../../admin.component.css']
})
export class CaseTypeComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // caseType: CaseType = new CaseType();
    caseTypes: CaseType[] = [];
    addStatus = true;
    updateStatus = true;
    deleteStatus = true;
    user: User = new User();

    displayedColumns = ['caseType', 'action'];
    dataSource = new MatTableDataSource<CaseType>(this.caseTypes);
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
        this.loadCaseTypeList();
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
        this.loadCaseTypeList();
    }

    loadCaseTypeList() {
        this.isSpinner = true;
        const msg = new Message();
        this._setupService.getCaseTypes().subscribe(
            (res) => {
                this.caseTypes = res.json();
                // console.log(this.caseTypes);
                this.dataSource = new MatTableDataSource<CaseType>(this.caseTypes);
                this.dataSource.paginator = this.paginator;

                if (this.caseTypes.length == 0) {
                    msg.msg = 'No CaseTypes Found';
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
        const dialogRef = this.dialog.open(AddCaseTypeField, {
            width: '450px',
            data: { field }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseTypeList();
        });
    }

    onEdit(value, caseType) {
        // console.log('value', value, '---id', id);
        const dialogRef = this.dialog.open(EditCaseTypeField, {
            width: '450px',
            data: { value, caseType }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseTypeList();
        });
    }

    onDelete(value, id, name) {
        const dialogRef = this.dialog.open(DeleteCaseTypeField, {
            width: '450px',
            data: { value, id, name }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseTypeList();
        });
    }
}


@Component({
    selector: 'add-caseType',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class AddCaseTypeField {

    title = "Add New Case Type";
    caseType: CaseType = new CaseType();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<AddCaseTypeField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        // console.log('caseType', this.caseType);
        // console.log('data', this.fieldType);
        this.form = fb.group({
            'caseType': [this.caseType.caseType, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseTypeDescription': [this.caseType.caseTypeDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseTypeTooltip': [this.caseType.caseTypeTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })

    }

    onCaseTypeFocusOut() {
        this.caseType.caseType = (this.caseType.caseType && this.caseType.caseType.length > 0 ? this.caseType.caseType.trim() : this.caseType.caseType);
    }

    onCaseTypeDescriptionFocusOut() {
        this.caseType.caseTypeDescription = (this.caseType.caseTypeDescription && this.caseType.caseTypeDescription.length > 0 ? this.caseType.caseTypeDescription.trim() : this.caseType.caseTypeDescription);
    }

    onCaseTypeTooltipFocusOut() {
        this.caseType.caseTypeTooltip = (this.caseType.caseTypeTooltip && this.caseType.caseTypeTooltip.length > 0 ? this.caseType.caseTypeTooltip.trim() : this.caseType.caseTypeTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.addCaseType(this.caseType).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully added an caseType';
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
    selector: 'edit-caseType',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class EditCaseTypeField {

    title = "Edit Case Type";
    caseType: CaseType = new CaseType();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<EditCaseTypeField>,
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

        if (this.fieldType === 'caseType') {
            // this.caseType.id = data.id;
            // this.caseType.caseTypeId = data.id;
            // this.caseType.caseType = data.name;
            this.caseType = data.caseType;
        }
        // console.log('this.caseType', this.caseType);

        this.form = fb.group({
            'caseType': [this.caseType.caseType, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseTypeDescription': [this.caseType.caseTypeDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseTypeTooltip': [this.caseType.caseTypeTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })
    }

    onCaseTypeFocusOut() {
        this.caseType.caseType = (this.caseType.caseType && this.caseType.caseType.length > 0 ? this.caseType.caseType.trim() : this.caseType.caseType);
    }

    onCaseTypeDescriptionFocusOut() {
        this.caseType.caseTypeDescription = (this.caseType.caseTypeDescription && this.caseType.caseTypeDescription.length > 0 ? this.caseType.caseTypeDescription.trim() : this.caseType.caseTypeDescription);
    }

    onCaseTypeTooltipFocusOut() {
        this.caseType.caseTypeTooltip = (this.caseType.caseTypeTooltip && this.caseType.caseTypeTooltip.length > 0 ? this.caseType.caseTypeTooltip.trim() : this.caseType.caseTypeTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.updateCaseType(this.caseType).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully updated an caseType';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close(this.caseType);
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}



@Component({
    selector: 'delete-caseType',
    templateUrl: '../../../dialogs/admin.confirm.field.delete.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeleteCaseTypeField {
    fieldType: string;
    id: number;
    name: string;
    constructor(
        public dialogRef: MatDialogRef<DeleteCaseTypeField>,
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
        this._setupService.deleteCaseType(this.id).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully deleted an caseType';
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




