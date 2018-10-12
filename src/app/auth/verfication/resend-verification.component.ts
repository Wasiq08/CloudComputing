import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { Message, MessageTypes } from '../../core/models/message';
import { User } from '../../core/models/user';
// import { MakePaymentComponent } from '../../payments/make-payment.component';



@Component({
    selector: 'verification',
    moduleId: module.id,
    templateUrl: 'resend-verification.component.html',
    styleUrls: ['../auth.component.css']
})
export class ResendVerificationComponent implements OnInit {
    currentURL = '';
    private sub: any;
    isEmailExist = true;
    errMsg: string;
    successMsg: string;
    role: string;
    email: string;
    isSubmitted = false;
    user: User = new User();
    checkUser: any;
    resendEmail = false;
    hideResend = false;
    formEmail: FormGroup;
    // patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    patternEmail = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$";

    constructor( @Inject('IAuthService') private _authService: IAuthService, private _uiService: UIService,
        private route: ActivatedRoute, private _router: Router, private fb: FormBuilder
    ) {
        this.currentURL = window.location.href;
        this.formEmail = fb.group({
            // 'email': [this.user.email, Validators.compose([Validators.required, Validators.email, Validators.pattern(this.patternEmail)])]
            'email': [this.user.email, Validators.compose([Validators.required, Validators.email])]
        });
    }


    ngOnInit() {

    }

    onClickResend() {
        // call function here to resend email and get back to this same page
        this.isSubmitted = true;
        // this.hideResend = true;
        // this.resendEmail = false;

        this._authService.resendVerificationEmail(this.user).subscribe(

            (res) => {
                // console.log("Email resend successfully.",res);
                // this.isSubmitted = false;

                // this.hideResend = false;
                // this.resendEmail = true;
                const msg = new Message();
                msg.msg = res.json() ? res.json() : 'Email has been resent successfully.';
                // const resMsg = res.json().genericResponse.genericBody.message;

                // if (resMsg === 'your account is already verified') {
                //     msg.msg = 'Your account has already been verified. Please go to login.';
                // }
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');

                setTimeout((router: Router) => {
                    this.isSubmitted = false;
                    this._router.navigate(['/verification']);
                }, 3000);
            },
            (err) => {
                // console.log(this.user);

                console.log(err);
                this.isSubmitted = false;
                // const msg = new Message();
                // msg.msg = 'Sorry, an error has occured';
                // msg.msgType = MessageTypes.Error;
                // msg.autoCloseAfter = 400;
                // this._uiService.showToast(msg, '');
                this._authService.errStatusCheck(err);
            }
        );
    }

    onEmailFocusOut() {

        this.user.email = (this.user.email && this.user.email.length > 0 ? this.user.email.trim() : this.user.email);
        if (this.user.email && this.user.email.length > 0 && this.formEmail.controls['email'].valid) {
            this._authService.checkEmailAvailability(this.user.email, "")
                .subscribe(
                // () => this.isEmailExist = true,
                // (err) => this.isEmailExist = false
                (res) => {
                    if (res.json()) {
                        // console.log("email is available");
                        this.isEmailExist = false;
                        this.formEmail.controls.email.setErrors({ notAvailable: true });
                    }
                    else {
                        // console.log("email is not available");
                        this.isEmailExist = true;
                    }
                },
                (err) => {
                    let msg;
                    msg = this._authService.errStatusCheck(err);
                    // console.log("msg",msg);
                    // this._uiService.showToast(msg, '');
                    // this.formRegister.controls.email.setErrors({ notAvailable: true });
                    // this.formRegister.controls['email'].setErrors({ notAvailable: true });
                    if (err.status == 404) {

                    }
                    else {
                        // msg = this._authServices.errStatusCheck(err);
                        // this._uiServices.showToast(msg);
                    }
                    // console.log(this.formRegister.controls['email'])
                }

                );
        }
        // }
    }

    onClickLogin() {
        this.user = this._authService.getUser();
        // console.log('user', this.user);
        // if (this.user && this.user.entityType) {
        //     this.user.entityType === 'brand' || this.user.entityType === 'influencer' ? this._router.navigateByUrl('login') : this._router.navigateByUrl('login');
        // } else {
        //     this._router.navigateByUrl('');
        // }
        this._router.navigateByUrl('login')
    }
}

