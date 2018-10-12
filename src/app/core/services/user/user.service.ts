import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy, Inject } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { User } from "../../models/user";
import { Token } from "../../models/token";

import { IAuthService } from '../auth/iauth.service';

import { environment } from "../../../../environments/environment";

@Injectable()
export class UserService {
    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _http: HttpService
    ) { }

    protected mapUser(res: any): User {
        // const userData = res.json().genericResponse.genericBody.data.userData;
        // const userData = res.json().genericBody.data.userData;

        // const userData = res.json();
        const userData = res.json().length > 0 ? res.json()[0] : null;
        const isUser = new User();
        if (userData) {


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
        }

        return isUser;
    }

    getStatus(): Observable<any> {

        // let url = 'test/info';
        let url = 'user/full';
        let token: Token;
        token = this._authService.getTokenData();
        console.log("token", token.tokenId);
        let tokenId;
        // tokenId = this._authService.getToken();
        tokenId = token.tokenId;


        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);
        // options.headers.append('Authorization', 'Bearer ' + tokenId);
        // options.headers.append('Authorization', 'Bearer '+token);

        return this._http.get(url, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
            .do((res) => {
                const isUser = this.mapUser(res);
                isUser.isLoggedIn = isUser.isActive && !isUser.isBlocked ? true : false;
                this._authService.storeUser(isUser);
                this._authService.loginStatusChanged.next(isUser);
            });
    }

    updateUserPassword(id, currentPass, newPass): Observable<any> {

        // const getUrl = 'change/password';
        const getUrl = 'user/change/password';
        const body = {
            Id: id,
            CurrentPassword: currentPass,
            NewPassword: newPass
        };

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
    }
}