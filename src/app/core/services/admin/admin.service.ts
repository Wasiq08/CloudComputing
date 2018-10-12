import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpService } from '../base/http.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Token } from "../../models/token";
import { environment } from '../../../../environments/environment';
import { Injectable, Inject } from '@angular/core';

import { IAuthService } from '../auth/iauth.service';

@Injectable()
export class AdminService {

    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _http: HttpService
    ) {
    }

    // --------- User
    public getUsersList(): Observable<any> {

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        // const getUrl = 'users/list';
        const getUrl = 'user/all/mini';
        return this._http.get(getUrl, options)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }

    createUser(user): Observable<any> {
        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        // let getUrl = 'add/user';
        let getUrl = 'user/add';
        let body = {
            SapId: user.sapId,
            UserEmail: user.email,
            UserPassword: user.password,
            ConfirmPassword: user.confirmPassword,
            FirstName: user.firstName,
            LastName: user.lastName,
            CountryId: user.countryId,
            RegionId: user.regionId,
            CityId: user.cityId,
            BranchId: user.branchId,
            DesignationId: user.designationId,
            DepartmentId: user.departmentId,

            // UserRolePermission: {
            //     RoleId: user.userRolePermission.roleId,
            // },
            UserRolePermission: [
                {
                    RoleId: user.userRolePermission.roleId,
                }
            ],
        }

        return this._http.post(getUrl, body, options)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    public mapUser(res: any): User {
        // const userData = res.json().genericResponse.genericBody.data.userData;
        // const userData = res.json().genericBody.data.userData;
        const userData = res;
        const isUser = new User();
        // isUser.fullName = userData.entity.entityName;
        isUser.id = userData.id;
        isUser.sapId = userData.sapId;
        isUser.email = userData.userEmail;
        isUser.password = userData.userPassword;
        isUser.firstName = userData.firstName;
        isUser.lastName = userData.lastName;

        isUser.cnic = userData.cnic;
        isUser.mobileNumber = userData.mobileNum;
        isUser.phoneNumber = userData.phoneNum;

        isUser.designationId = userData.designationId;
        isUser.departmentId = userData.departmentId;
        // isUser.roleId =  userData.roleId;
        isUser.countryId = userData.countryId;
        isUser.stateId = userData.stateId;
        isUser.regionId = userData.regionId;
        isUser.cityId = userData.cityId;
        isUser.branchId = userData.branchId;

        // isUser.accountVerified = userData.isActive;
        isUser.isActive = userData.isActive;
        isUser.isBlocked = userData.isBlocked;
        isUser.lastLogin = userData.lastLogin;
        isUser.createdOn = userData.createdOn;
        isUser.createdBy = userData.createdBy;
        isUser.updatedOn = userData.updatedOn;
        isUser.updatedBy = userData.updatedBy;

        // isUser.entityType = userData.entity.entityType;
        // isUser.entityId = userData.entity.id;
        // isUser.entityName = userData.entity.entityName;

        // isUser.token = userData.token.token;

        // isUser.permissions = userData.userRole.permissions;
        // isUser.overAllUnreadStatus = userData.entity.overAllUnreadStatus;
        // isUser.profilePic = userData.entity.profilePic;
        // isUser.coverPic = userData.entity.coverPic;;

        // let expiryTime = new Date(Date.now());
        // expiryTime.setSeconds(expiryTime.getSeconds() + userData.token.expiry);
        // isUser.expiry = Date.now() + (userData.token.expiry * 1000);

        return isUser;
    }

    public unBlockUser(id): Observable<any> {
        // const getUrl = 'activate/user/' + id;
        const getUrl = 'user/unblock/' + id;

        const body = {};

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });

        // return this._http.get(getUrl)
        //     // .map(res => res.json())
        //     .map((res: Response) => res)
        //     .catch((error: any) =>
        //     // Observable.throw(error.json() || 'Server error')
        //     {
        //         return Observable.throw(error);
        //     }
        //     );
    }

    public blockUser(id): Observable<any> {
        // const getUrl = 'deactivate/user/' + id;
        const getUrl = 'user/block/' + id;

        const body = {};

        let token: Token;
        token = this._authService.getTokenData();
        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        return this._http.put(getUrl, body, options)
            .map((res: Response) => res)
            .catch((error: any) => {
                return Observable.throw(error);
            });

        // return this._http.get(getUrl)
        //     // .map(res => res.json())
        //     .map((res: Response) => res)
        //     .catch((error: any) =>
        //     // Observable.throw(error.json() || 'Server error')
        //     {
        //         return Observable.throw(error);
        //     }
        //     );
    }

}