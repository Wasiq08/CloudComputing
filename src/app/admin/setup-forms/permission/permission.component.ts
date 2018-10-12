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

import { Permission } from '../../../core/models/permission';
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'permission-list',
    templateUrl: 'permission.component.html',
    styleUrls: ['../setup.forms.css', '../../admin.component.css']
})
export class PermissionComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // permission: Permission = new Permission();
    permissions: Permission[] = [];
    addStatus = true;
    updateStatus = true;
    deleteStatus = true;
    user: User = new User();

    displayedColumns = ['permissionName', 'action'];
    dataSource = new MatTableDataSource<Permission>(this.permissions);
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
        this.loadPermissionList();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        // console.log(this.dataSource);
    }

    refreshList() {
        this.isSpinner = true;
        this.filter = "";
        this.dataSource.filter = null;
        this.loadPermissionList();
    }

    loadPermissionList() {

        this.isSpinner = true;
        const msg = new Message();
        this._setupService.getPermissions().subscribe(
            (res) => {
                this.permissions = res.json();
                // console.log(this.permissions);
                this.dataSource = new MatTableDataSource<Permission>(this.permissions);
                this.dataSource.paginator = this.paginator;
                // console.log(this.dataSource);
                if (this.permissions.length == 0) {
                    msg.msg = 'No Permissions Found';
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
        const dialogRef = this.dialog.open(AddPermissionField, {
            width: '450px',
            data: { field }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadPermissionList();
        });
    }

    onEdit(value, id, name, tooltip, placeholder) {
        // console.log('value', value, '---id', id);
        const dialogRef = this.dialog.open(EditPermissionField, {
            width: '450px',
            data: { value, id, name, tooltip, placeholder }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadPermissionList();
        });
    }

    onDelete(value, id, name) {
        const dialogRef = this.dialog.open(DeletePermissionField, {
            width: '450px',
            data: { value, id, name }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadPermissionList();
        });
    }
}


@Component({
    selector: 'add-permission',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class AddPermissionField {

    title = "Add New Permission";
    permission: Permission = new Permission();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<AddPermissionField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        // console.log('permission', this.permission);
        // console.log('data', this.fieldType);
        this.form = fb.group({
            'permissionName': [this.permission.permissionName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
        })

    }

    onPermissionFocusOut() {
        this.permission.permissionName = (this.permission.permissionName && this.permission.permissionName.length > 0 ? this.permission.permissionName.trim() : this.permission.permissionName);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.addPermission(this.permission).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully added an permission';
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
    selector: 'edit-permission',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class EditPermissionField {
    
    title = "Edit Permission";
    permission: Permission = new Permission();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<EditPermissionField>,
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

        if (this.fieldType === 'permission') {
            this.permission.id = data.id;
            this.permission.permissionId = data.id;
            this.permission.permissionName = data.name;
        }
        // console.log('this.permission', this.permission);

        this.form = fb.group({
            'permissionName': [this.permission.permissionName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
        })
    }

    onPermissionFocusOut() {
        this.permission.permissionName = (this.permission.permissionName && this.permission.permissionName.length > 0 ? this.permission.permissionName.trim() : this.permission.permissionName);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.updatePermission(this.permission).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully updated an industry';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close(this.permission);
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}



@Component({
    selector: 'delete-permission',
    templateUrl: '../../../dialogs/admin.confirm.field.delete.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeletePermissionField {
    fieldType: string;
    id: number;
    name: string;
    constructor(
        public dialogRef: MatDialogRef<DeletePermissionField>,
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
        this._setupService.deletePermission(this.id).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully deleted an permission';
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




