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
import { CaseClassification } from '../../../core/models/caseClassification';
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'caseClassification-list',
    templateUrl: 'case.classification.component.html',
    styleUrls: ['../setup.forms.css', '../../admin.component.css']
})
export class CaseClassificationComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // caseClassification: CaseClassification = new CaseClassification();
    caseClassifications: CaseClassification[] = [];
    addStatus = true;
    updateStatus = true;
    deleteStatus = true;
    user: User = new User();

    displayedColumns = ['caseClassification', 'action'];
    dataSource = new MatTableDataSource<CaseClassification>(this.caseClassifications);
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
        this.loadCaseClassificationList();
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
        this.loadCaseClassificationList();
    }

    loadCaseClassificationList() {
        this.isSpinner = true;
        const msg = new Message();
        this._setupService.getCaseClassifications().subscribe(
            (res) => {
                this.caseClassifications = res.json();
                // console.log(this.caseClassifications);
                this.dataSource = new MatTableDataSource<CaseClassification>(this.caseClassifications);
                this.dataSource.paginator = this.paginator;

                if (this.caseClassifications.length == 0) {
                    msg.msg = 'No CaseClassifications Found';
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
        const dialogRef = this.dialog.open(AddCaseClassificationField, {
            width: '450px',
            data: { field }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseClassificationList();
        });
    }

    onEdit(value, caseClassification) {
        // console.log('value', value, '---id', id);
        const dialogRef = this.dialog.open(EditCaseClassificationField, {
            width: '450px',
            data: { value, caseClassification }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseClassificationList();
        });
    }

    onDelete(value, id, name) {
        const dialogRef = this.dialog.open(DeleteCaseClassificationField, {
            width: '450px',
            data: { value, id, name }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseClassificationList();
        });
    }
}


@Component({
    selector: 'add-caseClassification',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class AddCaseClassificationField {

    title = "Add New Case Classification";
    caseClassification: CaseClassification = new CaseClassification();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<AddCaseClassificationField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        // console.log('caseClassification', this.caseClassification);
        // console.log('data', this.fieldType);
        this.form = fb.group({
            'caseClassification': [this.caseClassification.caseClassification, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseClassificationDescription': [this.caseClassification.caseClassificationDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseClassificationTooltip': [this.caseClassification.caseClassificationTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })

    }

    onCaseClassificationFocusOut() {
        this.caseClassification.caseClassification = (this.caseClassification.caseClassification && this.caseClassification.caseClassification.length > 0 ? this.caseClassification.caseClassification.trim() : this.caseClassification.caseClassification);
    }

    onCaseClassificationDescriptionFocusOut() {
        this.caseClassification.caseClassificationDescription = (this.caseClassification.caseClassificationDescription && this.caseClassification.caseClassificationDescription.length > 0 ? this.caseClassification.caseClassificationDescription.trim() : this.caseClassification.caseClassificationDescription);
    }

    onCaseClassificationTooltipFocusOut() {
        this.caseClassification.caseClassificationTooltip = (this.caseClassification.caseClassificationTooltip && this.caseClassification.caseClassificationTooltip.length > 0 ? this.caseClassification.caseClassificationTooltip.trim() : this.caseClassification.caseClassificationTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.addCaseClassification(this.caseClassification).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully added an caseClassification';
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
    selector: 'edit-caseClassification',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class EditCaseClassificationField {

    title = "Edit Case Classification";
    caseClassification: CaseClassification = new CaseClassification();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<EditCaseClassificationField>,
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

        if (this.fieldType === 'caseClassification') {
            // this.caseClassification.id = data.id;
            // this.caseClassification.caseClassificationId = data.id;
            // this.caseClassification.caseClassification = data.name;
            this.caseClassification = data.caseClassification;
        }
        // console.log('this.caseClassification', this.caseClassification);

        this.form = fb.group({
            'caseClassification': [this.caseClassification.caseClassification, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseClassificationDescription': [this.caseClassification.caseClassificationDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseClassificationTooltip': [this.caseClassification.caseClassificationTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })
    }

    onCaseClassificationFocusOut() {
        this.caseClassification.caseClassification = (this.caseClassification.caseClassification && this.caseClassification.caseClassification.length > 0 ? this.caseClassification.caseClassification.trim() : this.caseClassification.caseClassification);
    }

    onCaseClassificationDescriptionFocusOut() {
        this.caseClassification.caseClassificationDescription = (this.caseClassification.caseClassificationDescription && this.caseClassification.caseClassificationDescription.length > 0 ? this.caseClassification.caseClassificationDescription.trim() : this.caseClassification.caseClassificationDescription);
    }

    onCaseClassificationTooltipFocusOut() {
        this.caseClassification.caseClassificationTooltip = (this.caseClassification.caseClassificationTooltip && this.caseClassification.caseClassificationTooltip.length > 0 ? this.caseClassification.caseClassificationTooltip.trim() : this.caseClassification.caseClassificationTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.updateCaseClassification(this.caseClassification).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully updated an caseClassification';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close(this.caseClassification);
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}



@Component({
    selector: 'delete-caseClassification',
    templateUrl: '../../../dialogs/admin.confirm.field.delete.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeleteCaseClassificationField {
    fieldType: string;
    id: number;
    name: string;
    constructor(
        public dialogRef: MatDialogRef<DeleteCaseClassificationField>,
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
        this._setupService.deleteCaseClassification(this.id).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully deleted an caseClassification';
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




