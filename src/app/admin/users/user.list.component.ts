import { Component, Input, OnInit, Inject, OnChanges, Output, EventEmitter, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { UIService } from '../../core/services/ui/ui.service';
import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { Router } from '@angular/router';
// import { CountryInfo } from '../core/models/location/country.info';
import { Country } from '../../core/models/country';
// import { CountryService } from '../../core/services/country/country.service';
import { PageEvent } from '@angular/material';
import { City } from '../../core/models/city';
// import { BrandService } from '../../core/services/brand/brand.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from '../../core/services/admin/admin.service';
// import { AdminRoles } from '../../core/models/admin/role.model';
import { Subject } from 'rxjs/Subject';
// import { UtilityService } from '../core/services/general/utility.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'user-list',
    moduleId: module.id,
    templateUrl: 'user.list.component.html',
    styleUrls: ['users.css'],
})
export class UserListComponent implements OnInit, OnChanges, OnDestroy {

    length = 100; // total searched records
    pageSize = 25; // by default
    pageSizeOptions = [25, 50, 100];
    upperLimit = 0;
    user: User;
    // country = new CountryInfo();
    isLogin: boolean;
    // userList: any;
    userList: User[] = [];
    private ngUnsubscribe: Subject<any> = new Subject();
    status = true;
    editStatus = true;
    addStatus = true;
    deleteStatus = true;

    listFilter: string;
    formRegister: FormGroup;

    displayedColumns = ['firstName', 'lastName', 'loginEmail', 'role', 'action'];
    dataSource = new MatTableDataSource<User>(this.userList);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isSpinner = false;
    filter: string = "";

    constructor(
        private _uiService: UIService,
        private _router: Router,
        @Inject('IAuthService') private _authService: IAuthService,
        // private _countryService: CountryService, private utilityService: UtilityService,
        public dialog: MatDialog,
        // private _brandService: BrandService, 
        private _adminService: AdminService,
    ) {

    }

    ngOnInit(): void {

        // check if a user is logged in
        // if (!this._authService.isLoggedIn()) {
        //     this._router.navigateByUrl('login');
        // }
        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();
        // if (this.user.entityType === 'brand') {
        // this.status = this.utilityService.checkUserPermission(this.user, 'brand_user_list');
        // this.addStatus = this.utilityService.checkUserPermission(this.user, 'add_brand_user');
        // this.editStatus = this.utilityService.checkUserPermission(this.user, 'edit_brand_user');
        // this.deleteStatus = this.utilityService.checkUserPermission(this.user, 'delete_brand_user');
        // console.log('this.status', this.status);

        // if (!this.status) { this._router.navigate(['/permission']); }
        // }

        // console.log('this is a userList page');
        this.loadUserList();
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
        this.loadUserList();
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    ngOnDestroy() {
        this.ngUnsubscribe.unsubscribe();
    }

    callPaginator(page) {
        console.log('Pagination Object:', page);
        if (page.pageSize) {
            this.pageSize = page.pageSize;
        }
        this.onPageChange(page.pageIndex);
    }

    onPageChange(pageNumber) {
        let offset = 0;
        const limit = this.pageSize;

        if (pageNumber) {
            offset = pageNumber * this.pageSize;
            this.upperLimit = pageNumber * this.pageSize + 1;

        }
        offset = pageNumber * this.pageSize;
        offset++;
        console.log('offset', offset, 'limit', limit);
        // this.searchObj.limitValue = limit;
        // this.searchObj.offsetValue = offset;
    }


    loadUserList() {
        this.isSpinner = true;

        // this._brandService.getBrandUserList().takeUntil(this.ngUnsubscribe).subscribe(
        //     (res) => {
        //         this.userList = res.brandUsers;
        //         console.log('brand list:', this.userList);
        //     },
        //     (err) => {
        //         console.log(err);
        //     }
        // );
        const msg = new Message();
        this._adminService.getUsersList().subscribe(
            (res) => {
                // this.userList = res.json();
                let array = res.json();
                // console.log('res list:', array);
                var uList = [];
                for (let i = 0; i < array.length; i++) {
                    let u = this._adminService.mapUser(array[i]);
                    uList.push(u);
                }
                this.userList = uList;

                this.dataSource = new MatTableDataSource<User>(this.userList);
                this.dataSource.paginator = this.paginator;
                // console.log('user list:', this.userList);

                if (this.userList.length == 0) {
                    msg.msg = 'No Users Found';
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

    deActivateUser(user) {

    }

    activateUser(user) {

    }

    unBlockUser(user) {
        const msg = new Message();
        this._adminService.unBlockUser(user.id).subscribe(
            (res) => {
                // this.userList = res.json();
                // console.log('user list:', this.userList);
                msg.msg = res.json() ? res.json() : 'You have successfully activate a user';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                // this.loadUserList();
                this.refreshList();
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            }
        );
    }

    blockUser(user) {
        const msg = new Message();
        this._adminService.blockUser(user.id).subscribe(
            (res) => {
                // this.userList = res.json();
                // console.log('user list:', this.userList);
                msg.msg = res.json() ? res.json() : 'You have successfully deactivate a user';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                // this.loadUserList();
                this.refreshList();
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            }
        );
    }

    editUser(data) {
        // console.log('user', data);
        // const role = data.role;
        // const firstName = data.user.firstName;
        // const lastName = data.user.lastName;
        // const id = data.user.id;

        // const dialogRef = this.dialog.open(EditBrandUser, {
        //     width: '450px',
        //     data: { id, role, firstName, lastName }
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     this.loadUserList();
        // });
    }

}


@Component({
    selector: 'edit-branduser',
    templateUrl: '../../dialogs/branduser.edit.dialog.html',
})

export class EditBrandUser {

    fieldType: string;
    branduser: User = new User();
    firstName: string;
    lastName: string;
    selectedRole: number;
    // roles = new Array<AdminRoles>();

    constructor(
        public dialogRef: MatDialogRef<EditBrandUser>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _uiService: UIService,
        // private _brandService: BrandService,
        // private _adminService: AdminService,
        private _router: Router,

    ) {
        this.loadRoles();
        console.log('data', data);
        this.branduser.firstName = data.firstName;
        this.branduser.lastName = data.lastName;
        this.branduser.id = data.id;
        this.selectedRole = data.role.id;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        // this._brandService.editBrandUser(this.branduser).subscribe(
        //     (res) => {
        //         const msg = new Message();
        //         msg.msg = 'You have successfully updated a user';
        //         msg.msgType = MessageTypes.Information;
        //         msg.autoCloseAfter = 400;
        //         this._uiService.showToast(msg, 'info');
        //         this.dialogRef.close();
        //     },
        //     (err) => {
        //         console.log(err);
        //         const msg = new Message();
        //         msg.msg = 'Sorry, an error has occured';
        //         msg.msgType = MessageTypes.Error;
        //         msg.autoCloseAfter = 400;
        //         this._uiService.showToast(msg, '');
        //     });
    }

    // getting roles list
    loadRoles() {
        // this._adminService.getUsersRolesList().subscribe((res) => {
        //     this.roles = res.roles;
        //     console.log('users roles list', res.roles);
        // });
    }

    onRoleSelected(selected) {
        // this.branduser.roleId = selected.value;
        // console.log('selected', selected.value);
    }
}
