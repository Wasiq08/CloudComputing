
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IAuthService } from "./iauth.service";
import { UIService } from '../ui/ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../../models/user";
import { Token } from "../../models/token";
import { environment } from "../../../../environments/environment";

import { Message, MessageTypes } from "../../models/message";


@Injectable()
export class AuthService implements IAuthService, OnDestroy {


    private messageSource = new BehaviorSubject<boolean>(false);
    currentMessage = this.messageSource.asObservable();

    loginStatusChanged = new Subject<User>();

    private _clientId: string = '';
    private _clientSecret: string = '';
    private token_expires: number;
    constructor(private _http: Http, private _router: Router,
        private _uiService: UIService,
    ) {
    }

    ngOnDestroy(): void {
        console.log("destorying auth service");
    }

    /**
    * Build API url.
    * @param url
    * @returns {string}
    */
    signinstatus(message: boolean) {
        this.messageSource.next(message)
    }

    protected getAuthFullUrl(url: string): string {
        return environment.authBaseUrl + url;
        // return environment.apiBaseUrl + url;
    }

    protected getFullUrl(url: string): string {
        // return environment.authBaseUrl + url;
        return environment.apiBaseUrl + url;
    }

    protected mapUser(res: any): User {
        // const userData = res.json().genericResponse.genericBody.data.userData;
        // const userData = res.json().genericBody.data.userData;
        const userData = res.json();
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

    /**
     * Build API url 
     * @param res 
     */
    protected getAPIFullUrl(url: String): string {
        return environment.apiBaseUrl + url
    }

    // protected mapUser(res: any): User {
    //     let userData = res.json().genericResponse.genericBody.data.userData;
    //             let isUser = new User();
    //             isUser.fullName =  userData.entity.entityName;
    //             isUser.email =  userData.email;
    //             isUser.firstName =  userData.firstName;
    //             isUser.lastName =  userData.lastName;
    //             isUser.accountVerified =  userData.accountVerified;
    //             isUser.lastLogin =  userData.lastLogin;
    //             isUser.created =  userData.created;
    //             isUser.updated =  userData.updated;
    //             isUser.entityType =  userData.entity.entityType;
    //             isUser.entityId =  userData.entity.id;
    //             isUser.entityName =  userData.entity.entityName;
    //             isUser.webUrl =  userData.entity.websiteUrl;
    //             isUser.token =  userData.token.token;
    //             isUser.id =  userData.id;
    //             // this.isUser.countryId =  userData.countryId;

    //             // let expiryTime = new Date(Date.now());
    //             // expiryTime.setSeconds(expiryTime.getSeconds() + userData.token.expiry);
    //             isUser.expiry =  Date.now() + (userData.token.expiry * 1000);

    //             isUser.roleId =  userData.userRole.id;
    //             isUser.roleName =  userData.userRole.roleName;
    //             isUser.userName =  userData.userName;

    //             return isUser;
    // }
    private SaveToken(response: Response) {
        let data = response.json();
        this.token_expires = Date.now() + ((data.expires_in - 60) * 1000);
        console.log("expiry:" + data.expires_in)
        localStorage.setItem('token_id', data.access_token);
        localStorage.setItem('token_expiry', this.token_expires.toString());
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('token_type', data.token_type);
        // setTimeout(function(){ this.logoutUser(); }, (data.expires_in * 1000));
        // console.log();

        return data;
    }
    checkToken(): boolean {
        // if(localStorage.getItem('token_id') )
        // {
        //     return true;

        // }
        // return false;
        if (localStorage.getItem('token_id')) {
            if ((parseInt(localStorage.getItem('token_expiry'))) > Date.now()) {
                return true;
            } else {
                this.logoutUser();
                return false;
            }
        } else {
            return false;
        }

    }

    isLoggedIn(): boolean {
        // console.log('authInfo1');
        // const user = this.getUser();
        // console.log('authInfo2',user);

        // if (user && user.isLoggedIn) {
        //     return true;
        // }

        const token = this.getTokenData();
        if (token && token.tokenExpiry) {
            if (token.tokenExpiry > Date.now().toString()) {
                return true;
            }
        }



        // this.loginStatusChanged.next(null);
        return false;
    }


    checkLogin(user: User): Observable<any> {
        // let url = this.getAPIFullUrl('user/login');
        let url = this.getAuthFullUrl('connect/token');

        // let url =  environment.authBaseUrl;

        // let body = {
        //     UserEmail: user.email,
        //     UserPassword: user.password
        // }

        let body = {
            // client_id: ,
            // client_secret: 'secret',
            // username: user.email,
            // password: user.password,
            // grant_type: 'password' 

            // client_id: clientId,
            // client_secret: clientSecret,
            // username: user.email,
            // password: user.password,
            // grant_type: grantType
        }

        let params = new URLSearchParams();
        params.append('grant_type', environment.grant_type);
        params.append('username', user.email);
        params.append('password', user.password);
        params.append('client_id', environment.client_id);
        params.append('client_secret', environment.client_secret);
        // params.append('scope', environment.scope);

        const options = new RequestOptions();

        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // options.headers.append('Content-Type', 'application/json');

        return this._http.post(url, params.toString(), options)
            .catch((err, caught) => {
                // console.log(err);
                return Observable.throw(err);
            })
            .do((res) => {
                // const isUser = this.mapUser(res);
                // isUser.isLoggedIn = isUser.isActive && !isUser.isBlocked ? true : false;
                // this.storeUser(isUser);
                // this.loginStatusChanged.next(isUser);
                this.SaveToken(res);
            });


    }


    forgotPassword_(user: User): Observable<any> {
        let url = this.getFullUrl('forgetpassword');
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body = {
            entityType: user.entityType,
            email: user.email,
        }

        return this._http.post(url, body, options)
            .catch((err, caught) => {
                //console.log(err);
                return Observable.throw(err);
            });
    }

    forgotPassword(user: User): Observable<any> {
        // let url = this.getFullUrl('user/reset/password');
        let url = this.getAPIFullUrl("user/reset/password/" + user.email);
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        let body = {
            // entityType: user.entityType,
            // email: user.email,
        }

        // return this._http.get(url).catch((err, caught) => {
        //     return Observable.throw(err);
        // });
        return this._http.post(url, body, options)
            .catch((err, caught) => {
                //console.log(err);
                return Observable.throw(err);
            });
    }


    resetPassword(user: User, key: string): Observable<any> {

        // let url = this.getFullUrl('forgetpassword/verify');
        let url = this.getFullUrl('user/registration/verify');

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body = {
            VerificationKey: key,
            // loginPassword: user.password,
            // confirmPassword: user.confirmPassword,
            UserPassword: user.password,
        }

        // return this._http.post(url, body, options)
        //     .catch((err, caught) => {
        //         //console.log(err);
        //         return Observable.throw(err);
        //     });

        return this._http.put(url, body)
            .catch((err, caught) => {
                return Observable.throw(err)
            })
    }

    checkEntityNameAvailability(entityName, entityType): Observable<any> {

        let url = this.getFullUrl('name/available');

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body = {
            entityName: entityName,
            entityType: entityType
        }

        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
            //.finally(() => console.log("Check name availability is completed."))
            ;

    }

    checkSapIdAvailability(sapId): Observable<any> {

        let url = this.getAPIFullUrl("/user/sapid/available/" + sapId);
        return this._http.get(url).catch((err, caught) => {
            return Observable.throw(err);
        });

    }

    checkEmailAvailability(emailAddress, entityType): Observable<any> {

        // let url = this.getFullUrl('email/available');

        // let options = new RequestOptions();
        // options.headers = new Headers();
        // options.headers.append('Content-Type', 'application/json');

        // let body = {
        //     email: emailAddress,
        //     entityType: entityType
        // }

        // return this._http.post(url, body, options)
        //     .catch((err, caught) => {
        //         return Observable.throw(err);
        //     });

        let url = this.getAPIFullUrl("/user/email/available/" + emailAddress);
        return this._http.get(url).catch((err, caught) => {
            return Observable.throw(err);
        });

    }

    update(user): Observable<any> {
        let url = this.getAPIFullUrl("user/registration/complete")
        let body = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            title: user.title,
            credentials: user.credentials,
            employer: user.employer,
            address: user.address,
            cityId: user.city.id,
            countryId: user.country.id,
            zipCode: user.zipCode,
            stateId: user.state.id,
            secretQuestion1: user.secretQuestion1,
            secretQuestion2: user.secretQuestion2,
            secretAnswer1: user.secretAnswer1,
            secretAnswer2: user.secretAnswer2
        }
        if (user.specialist.speciality) {
            body['specialist'] = {
                specialityId: user.specialist.speciality ? user.specialist.speciality.id : null,
                deaNumber: user.specialist.deaNumber,
                npiNumber: user.specialist.npiNumber,
                physicianLicenseNumber: user.specialist.physicianLicenseNumber,
                licensedStates: user.specialist.licensedStates ? user.specialist.licensedStates.id : null,
                practiceGroup: user.specialist.practiceGroup
            }
        }
        return this._http.put(url, body)
            .catch((err, caught) => {
                return Observable.throw(err)
            })
    }

    register(user: User): Observable<any> {

        let url = this.getAPIFullUrl('user/registration');

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body = {
            SapId: user.sapId,
            UserEmail: user.email,
            UserPassword: user.password,
            ConfirmPassword: user.confirmPassword,
            FirstName: user.firstName,
            LastName: user.lastName,
            // MobileNum: user.MobileNum,
            // Title: user.Title,
            // Credentials: user.Credentials
            DesignationId: user.designationId,
            DepartmentId: user.departmentId,
            // RoleId: user.userRolePermission.roleId,
            CountryId: user.countryId,
            RegionId: user.regionId,
            CityId: user.cityId,
            BranchId: user.branchId
            // UserRolePermission: {
            // RoleId: user.userRolePermission.roleId,
            // }
        }

        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
        // .finally(() => console.log("Signup request has been completed."))
    }

    verifyKey(key: string): Observable<any> {
        // let url = this.getAPIFullUrl('user/registration/verify');
        // let url = this.getAPIFullUrl('verify/account');
        let url = this.getAPIFullUrl('user/verify/account');
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body = { VerificationKey: key }

        return this._http.put(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
        // .finally(() => console.log("Email verification has been completed."));
    }

    resendEmail(user: User): Observable<any> {
        let url = this.getFullUrl('accountverification/resend');
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body = {
            email: user.email,
            entityType: user.entityType
        }
        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
        // .finally(() => console.log("Email verification has been completed."));
    }

    resendVerificationEmail(user: User): Observable<any> {
        // let url = this.getFullUrl('user/resend/verification/' + user.email);
        let url = this.getFullUrl('user/resend/verification/email/' + user.email);

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body = {
            //     email: user.email,
            //     entityType: user.entityType
        }
        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
        // // .finally(() => console.log("Email verification has been completed."));

        // return this._http.get(url).catch((err, caught) => {
        //     return Observable.throw(err);
        // });
    }

    getToken(): string {
        return localStorage.getItem('token_id');
    }

    getTokenData(): Token {

        const token = new Token();

        token.tokenId = localStorage.getItem('token_id');
        token.tokenExpiry = localStorage.getItem('token_expiry');
        token.refreshToken = localStorage.getItem('refresh_token');
        token.tokenType = localStorage.getItem('token_type');

        return token;

    }

    getLoggedinUser(): User {
        return this.getUser();
    }

    public storeUser(user: User) {
        if (!user) return;

        localStorage.setItem('user', JSON.stringify(user));
        // if (this.checkToken()) {
        // this.loginStatusChanged.next(true);
        // }
        //  console.log("user stored in local storage");
    }

    public storeUrlPath(urlPath: string) {
        localStorage.setItem('urlPath', JSON.stringify(urlPath));
    }

    getUrlPath(): string {
        return JSON.parse(localStorage.getItem('urlPath'));
    }

    getUser(): User {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'));
        }
        return;
    }

    verifyEmail(email: String) {
        let url = this.getAPIFullUrl("/user/email/available/" + email);
        return this._http.get(url).catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    logoutUser() {
        // this._router.navigate(['/login1']);

        localStorage.clear();
        this.loginStatusChanged.next(null);
        // console.log("Token Expired");


    }

    errStatusCheck(err: any): any {
        let errMsg: string;
        console.log('err', err);

        // this.isError = true;
        // this.isSubmitStarted = false;
        // this.onSubmitFinished.emit(err);
        const msg = new Message();
        msg.title = "";
        msg.iconType = "";
        if (err.status == 400) {
            msg.msg = err.json() ? err.json() : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg

        }
        else if (err.status == 401) {
            msg.msg = err.json() ? err.json() : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg

        }

        else if (err.status == 403) {

            // msg.msg = err.json() ? err.json() : 'Sorry, an error has occured';
            // msg.msgType = MessageTypes.Error;
            // msg.autoCloseAfter = 400;
            // this._uiService.showToast(msg, '');
            // return msg
            this._router.navigate(['/permission']);

        }

        else if (err.status == 404 && err.statusText == "Not Found") {

            msg.msg = 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg

        }
        else if (err.status == 404 && err.statusText !== "Not Found") {

            msg.msg = err.json() ? err.json() : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg

        }
        else {
            msg.msg = 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg
        }
    }
}