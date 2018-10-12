import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UIService } from '../../core/services/ui/ui.service'
import { AuthService } from '../../core/services/auth/auth.service'
import { UserService } from '../../core/services/user/user.service'
import { User } from '../../core/models/user'
import { Router } from '@angular/router';
import { Message, MessageTypes } from "../../core/models/message";
import { MaterialModule } from '../../material/material.module';


@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    Mainpage = "none";
    Loginpage = "block";
    Loadingpage = "none";
    signin: boolean;
    user: User = new User();
    loginUser: User = new User();
    successResponse: any;
    errorResponse: any;
    errMsg: string;
    isSubmitted: boolean = false;

    // patternemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    formLogin = new FormGroup({
        // 'email': [this.user.email, Validators.compose([Validators.required, Validators.email, Validators.pattern(this.patternEmail)])],
        'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
        'password': new FormControl(this.user.password, [Validators.required]),
    });
    constructor(
        private _authServices: AuthService,
        private _uiServices: UIService,
        private _router: Router,
        private _userService: UserService
    ) { }

    Mainpagecreateaccount() {
        this._router.navigate(['/registration']);
    }
    // emailFocus()
    // {
    //     this.user.email= this.user.email.toLocaleLowerCase();
    // }

    Mainpagesignin() {
        this.Mainpage = "none";
        this.Loginpage = "block";
    }

    ngOnInit(): void {
        // this._authServices.currentMessage.subscribe(value => this.signin = value)
        // if (this.signin) {
        //     this.Mainpagesignin()
        // }

        // if (this._authServices.checkToken()) {
        if (this._authServices.isLoggedIn()) {
            this._router.navigate(['/home']);
        }
    }

    onEmailFocusOut() {
        this.user.email = (this.user.email && this.user.email.length > 0 ? this.user.email.trim() : this.user.email);
    }

    login(): void {

        if (this.formLogin.invalid) {
            let msg = new Message();
            msg.title = ""
            msg.iconType = ""

            if (this.formLogin.controls['email'].hasError('required') && this.formLogin.controls['password'].hasError('required')) {
                msg.msg = "Email and password are required."
            }
            else if (this.formLogin.controls['email'].hasError('required')) {
                msg.msg = "Email is required."
            }
            else if (this.formLogin.controls['email'].hasError('email')) {
                msg.msg = "Invalid email address."
            }
            else if (this.formLogin.controls['email'].hasError('pattern')) {
                msg.msg = "Invalid email address."
            }
            else if (this.formLogin.controls['password'].hasError('required')) {
                msg.msg = "Password is required."
            }
            this._uiServices.showToast(msg, '');

        }
        else {
            this.Loginpage = "none";
            this.Loadingpage = "block";
            // console.log("trying to login...");
            this.isSubmitted = true;
            this.user.email = this.user.email.toLocaleLowerCase();

            this._authServices.checkLogin(this.user).subscribe(
                (res) => {
                    // console.log('res', res);



                    this._userService.getStatus().subscribe(
                        (res) => {
                            console.log("res", res)
                            this.isSubmitted = false;
                            this._router.navigate(['/home']);

                            // this.loginUser = this._authServices.getUser();
                            // // if (this._authServices.getUser().accountVerified) {

                            // // if (this._authServices.getUser().isActive || this._authServices.getUser().isActive == undefined) {
                            // if (this.loginUser.isActive || this.loginUser.isActive == undefined) {
                            //     console.log('test1');
                            //     this._router.navigate(['/home']);
                            // }
                            // else {
                            //     console.log('test2');
                            //     this._router.navigate(['/verification']);
                            // }
                        },
                        (err) => {
                            console.log('err', err);
                            this.isSubmitted = false;
                            // this._authServices.errStatusCheck(err);
                            this._router.navigate(['/home']);
                        }
                    );

                    // this.loginUser = this._authServices.getUser();
                    // // if (this._authServices.getUser().accountVerified) {

                    // // if (this._authServices.getUser().isActive || this._authServices.getUser().isActive == undefined) {
                    // if ((this.loginUser && this.loginUser.isActive) || this.loginUser == null) {
                    //     console.log('test1');
                    //     this._router.navigate(['/home']);
                    // }
                    // else {
                    //     console.log('test2');
                    //     this._router.navigate(['/verification']);
                    // }


                },
                (err) => {
                    console.log('err', err);
                    this.isSubmitted = false;
                    // this._authServices.errStatusCheck(err);
                    const msg = new Message();
                    if (err.status == 400) {

                        if(err.json() && err.json().error == "invalid_client"){
                            msg.msg = err.json() && err.json().error_description ? err.json().error_description : 'Sorry, an error has occured';
                            msg.msgType = MessageTypes.Error;
                            msg.autoCloseAfter = 400;
                            this._uiServices.showToast(msg, '');
                            
                            this._router.navigate(['/verification']);
                        }
                        else{
                            msg.msg = err.json() && err.json().error_description ? err.json().error_description : 'Sorry, an error has occured';
                            msg.msgType = MessageTypes.Error;
                            msg.autoCloseAfter = 400;
                            this._uiServices.showToast(msg, '');
                        }
                    }
                    else {
                        this._authServices.errStatusCheck(err);
                    }
                }
            );
        }
    }

    onForgetPassword() {
        this._router.navigateByUrl('forgot-password');
    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }

}
