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

import { Role } from '../../../core/models/role';
import { Permission } from '../../../core/models/permission';
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'assign-permission',
    templateUrl: 'assign.permission.component.html',
    styleUrls: ['../../admin.component.css']
})
export class AssignPermissionComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // permission: Permission = new Permission();

    roles: Role[] = [];
    permissions: Permission[] = [];
    addStatus = true;
    updateStatus = true;
    deleteStatus = true;
    user: User = new User();
    clickMore = false;
    edit = false;
    role: Role = new Role();
    expandedIndex = -1;
    isSave = false;

    displayedColumns = ['roleName', 'permission(s)', 'action'];
    dataSource = new MatTableDataSource<Role>(this.roles);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isSpinner = false;
    filter: string = "";

    displayedColumnsTwo = ['select', 'permission'];
    // displayedColumnsTwo = ['select'];
    dataSourceTwo = new MatTableDataSource<Permission>(this.permissions);
    selection = new SelectionModel<Permission>(true, []);
    isSpinnerTwo = false;

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
        this.loadRoleList();
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
        const msg = new Message();
        // if (this.newDepartmentId) {
        //     this.loadRoleViaId(this.newDepartmentId);
        // }
        // else {
        //     msg.msg = 'Please, select department';
        //     msg.msgType = MessageTypes.Error;
        //     msg.autoCloseAfter = 400;
        //     this._uiService.showToast(msg, '');
        //     this.isSpinner = false;
        // }
        this.loadRoleList();
    }

    refreshPermissionList() {
        this.isSpinner = true;
        this.filter = "";
        this.dataSource.filter = null;

        this.loadPermissionList(this.role);
    }

    loadRoleList() {
        this.isSpinner = true;
        this.dataSource = new MatTableDataSource<Role>([]);
        this.dataSource.paginator = this.paginator;
        const msg = new Message();
        
        this._setupService.getRolesWithPermissions().subscribe(
            (res) => {
                this.roles = res.json();
                // console.log(this.roles);
                this.dataSource = new MatTableDataSource<Role>(this.roles);
                this.dataSource.paginator = this.paginator;

                if (this.roles.length == 0) {
                    msg.msg = 'No Roles Found';
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

    loadPermissionList(val) {
        this.isSpinnerTwo = true;
        const msg = new Message();
        this._setupService.getPermissions().subscribe(
            (res) => {
                this.permissions = res.json();
                // console.log(this.roles);
                this.dataSourceTwo = new MatTableDataSource<Permission>(this.permissions);
                // this.dataSourceTwo.paginator = this.paginator;


                this.dataSourceTwo.data.forEach(row => {
                    val.permissions.forEach(row1 => {
                        if (row1.id == row.id) {
                            this.selection.select(row)
                        }
                    }
                    )
                }
                )

                if (this.permissions.length == 0) {
                    msg.msg = 'No Permissions Found';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                }
                this.isSpinnerTwo = false;
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
                this.isSpinnerTwo = false;
            }
        );
    }

    expandRow(index: number): void {
        console.log("test ", index)
        this.expandedIndex = index === this.expandedIndex ? -1 : index;
    }

    viewMore(field, role) {

        // console.log("test", role)

        const dialogRef = this.dialog.open(ViewRolePermission, {
            width: '450px',
            data: { field, role: role }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    onEdit(val: Role): void {
        this.edit = true;
        this.role = val;
        // this.dataSourceTwo = new MatTableDataSource<Permission>(this.role.permissions);
        this.loadPermissionList(val);
        this.selection = new SelectionModel<Permission>(true, []);
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSourceTwo.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSourceTwo.data.forEach(row => this.selection.select(row));
    }

    save() {
        // console.log("test role", this.role);
        // console.log("test", this.selection.selected);
        const msg = new Message();
        this.isSave = true;
        this._setupService.assignPermissionToRole(this.role, this.selection.selected).subscribe(
            (res) => {

                msg.msg = res.json() ? res.json() : 'You have successfully assign permissions';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.isSave = false;
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
                this.isSave = false;
            });
    }

    back() {
        this.edit = false;
        this.refreshList();
    }

}



@Component({
    selector: 'add-role',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class ViewRolePermission {

    role: Role = new Role();
    fieldType: string;

    constructor(
        public dialogRef: MatDialogRef<ViewRolePermission>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        this.role = data.role;
        // console.log("test1",this.role)
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        this.dialogRef.close();
    }

}