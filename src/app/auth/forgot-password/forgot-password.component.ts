import { Component, Input, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { User } from '../../core/models/user';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { Message, MessageTypes } from '../../core/models/message';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'forgot-password',
    moduleId: module.id,
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['../auth.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    // @Input() role = '';
    // @Output() onSubmitStarted = new EventEmitter();
    // @Output() onSubmitFinished = new EventEmitter<any>();

    // patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    user: User = new User();
    isEmailExist = true;
    isSubmitted = false;
    isSubmitStarted = false;
    emailSuccess = false;
    emailSuccessMsg: string = "";
    // private _name = '';
    // private _email = '';
    gotoUrl: string;

    form: FormGroup;

    constructor( @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService, private _router: Router,
        private activatedRoute: ActivatedRoute, private fb: FormBuilder
    ) {
        this.form = fb.group({
            // 'email': [this.user.email, Validators.compose([Validators.required, Validators.email, Validators.pattern(this.patternEmail)])],
            'email': [this.user.email, Validators.compose([Validators.required, Validators.email])],
        })
    }

    ngOnInit(): void {
        // this.role = this.activatedRoute.snapshot.queryParams['role'];
        // if (this.role === 'brand' || this.role == 'influencer') {
        //     this.gotoUrl = '/login';
        // }
        this.gotoUrl = '/login';
    }

    onSubmit() {

    }

    onEmailFocusOut() {

        this.user.email = (this.user.email && this.user.email.length > 0 ? this.user.email.trim() : this.user.email);
        if (this.user.email && this.user.email.length > 0 && this.form.controls['email'].valid) {
            this._authService.checkEmailAvailability(this.user.email, "")
                .subscribe(
                (res) => {
                    if (res.json()) {
                        console.log("email does not exist");
                        this.isEmailExist = false;
                        this.form.controls.email.setErrors({ notAvailable: true });
                    }
                    else {
                        console.log("email is exist");
                        this.isEmailExist = true;

                    }

                },
                (err) => {
                    // this.isEmailExist = false;
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
    }

    recoverPassword() {
        this.isSubmitted = true;
        // this.role = this.activatedRoute.snapshot.queryParams['role'];
        // this.user.entityType = this.role;
        //console.log(this.user);

        const msg = new Message();
        this._authService.forgotPassword(this.user).subscribe(
            (res) => {
                // console.log("res",res.json());
                this.isSubmitted = false;
                this.emailSuccess = true;
                msg.msg = res.json() ? res.json() : 'Successfully email sent';
                // msg.msg = 'Successfully email sent';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                // this._uiService.showToast(msg, 'info');
                this.emailSuccessMsg = msg.msg;

            },
            (err) => {
                // console.log(err);
                this.isSubmitted = false;
                this._authService.errStatusCheck(err);
            }
        );
    }

    onClickLogin() {
        // this.role = this.activatedRoute.snapshot.queryParams['role'];
        // this.role == 'brand' || this.role == 'influencer' ? this._router.navigate(['/login']) : this._router.navigate(['/login']);
        this._router.navigate(['/login']);
    }

}
