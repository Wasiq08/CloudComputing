import { Component, Input, OnInit, Inject, Output, EventEmitter, AfterViewInit, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { IAuthService } from '../../../core/services/auth/iauth.service';
import { UIService } from '../../../core/services/ui/ui.service';
// import { AdminService } from '../../../core/services/admin/backoffice.service';
import { Message, MessageTypes } from '../../../core/models/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { AddAdminUser } from '../../../core/models/admin/user.model';
// import { CampaignService } from '../../../core/services/campaign/campaign.service';
import { AdminSetupService } from '../../../core/services/admin/admin.setup.service';
// import { AdvanceSearchService } from '../../../core/services/influencer/search-options/advance.search.service';

import { Designation } from '../../../core/models/designation';
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'designation-list',
    templateUrl: 'designation.component.html',
    styleUrls: ['../setup.forms.css', '../../admin.component.css']
})
export class DesignationComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // designation: Designation = new Designation();
    designations: Designation[] = [];
    addStatus = true;
    updateStatus = true;
    deleteStatus = true;
    user: User = new User();

    displayedColumns = ['designationName', 'action'];
    dataSource = new MatTableDataSource<Designation>(this.designations);
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
        this.loadDesignationList();
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
        this.loadDesignationList();
    }

    loadDesignationList() {
        this.isSpinner = true;
        const msg = new Message();
        this._setupService.getDesignations().subscribe(
            (res) => {
                
                this.designations = res.json();
                // console.log(this.designations);
                this.dataSource = new MatTableDataSource<Designation>(this.designations);
                this.dataSource.paginator = this.paginator;

                if (this.designations.length == 0) {
                    msg.msg = 'No Designations Found';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                }
                this.isSpinner = false;
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);

                this.isSpinner = false;
            }
        );
    }

    addField(field) {
        const dialogRef = this.dialog.open(AddDesignationField, {
            width: '450px',
            data: { field }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadDesignationList();
        });
    }

    onEdit(value, id, name, tooltip, placeholder) {
        // console.log('value', value, '---id', id);
        const dialogRef = this.dialog.open(EditDesignationField, {
            width: '450px',
            data: { value, id, name, tooltip, placeholder }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadDesignationList();
        });
    }

    onDelete(value, id, name) {
        const dialogRef = this.dialog.open(DeleteDesignationField, {
            width: '450px',
            data: { value, id, name }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadDesignationList();
        });
    }
}


@Component({
    selector: 'add-designation',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class AddDesignationField {

    title = "Add New Designation";
    designation: Designation = new Designation();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<AddDesignationField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        // console.log('designation', this.designation);
        // console.log('data', this.fieldType);
        this.form = fb.group({
            'designationName': [this.designation.designationName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
        })

    }

    onDesignationFocusOut() {
        this.designation.designationName = (this.designation.designationName && this.designation.designationName.length > 0 ? this.designation.designationName.trim() : this.designation.designationName);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.addDesignation(this.designation).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully added an designation';
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
    selector: 'edit-designation',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class EditDesignationField {

    title = "Edit Designation";
    designation: Designation = new Designation();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<EditDesignationField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.value;
        console.log('data', data);

        if (this.fieldType === 'designation') {
            this.designation.id = data.id;
            this.designation.designationId = data.id;
            this.designation.designationName = data.name;
        }
        console.log('this.designation', this.designation);

        this.form = fb.group({
            'designationName': [this.designation.designationName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
        })
    }

    onDesignationFocusOut() {
        this.designation.designationName = (this.designation.designationName && this.designation.designationName.length > 0 ? this.designation.designationName.trim() : this.designation.designationName);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.updateDesignation(this.designation).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully updated an industry';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close(this.designation);
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}



@Component({
    selector: 'delete-designation',
    templateUrl: '../../../dialogs/admin.confirm.field.delete.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeleteDesignationField {
    fieldType: string;
    id: number;
    name: string;
    constructor(
        public dialogRef: MatDialogRef<DeleteDesignationField>,
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
        this._setupService.deleteDesignation(this.id).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully deleted an designation';
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




