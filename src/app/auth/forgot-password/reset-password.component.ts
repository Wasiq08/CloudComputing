import { Component, Input, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { User } from '../../core/models/user';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { Message, MessageTypes } from '../../core/models/message';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'reset-password',
    moduleId: module.id,
    templateUrl: 'reset-password.component.html',
    styleUrls: ['../auth.component.css']
})
export class ResetPasswordComponent {

    // @Input() key = '';
    // @Output() onSubmitStarted = new EventEmitter();
    // @Output() onSubmitFinished = new EventEmitter<any>();

    phide = true;
    cphide = true;

    key: string = '';

    form: FormGroup;

    user: User = new User();
    isSubmitted = false;
    successMsg: string;
    // errMsg: string;

    passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,20}$/

    passwordMatcher = (control: AbstractControl): { [key: string]: boolean } => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        if (!password || !confirmPassword) return null;
        return password.value === confirmPassword.value ? null : { nomatch: true };
        // if (password != confirmPassword) {
        //     console.log('false');
        //     control.get('confirmPassword').setErrors({ MatchPassword: true })
        // } else {
        //     console.log('true');
        //     return null
        // }
    };

    matchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password != confirmPassword) {
            console.log('false');
            AC.get('confirmPassword').setErrors({ matchPassword: true });
        } else {
            console.log('true');
            // AC.get('confirmPassword').setErrors(null)
            return null
        }
    }

    constructor( @Inject('IAuthService') private _authService: IAuthService, private _router: Router, private activatedRoute: ActivatedRoute,
        private _uiService: UIService, private fb: FormBuilder
    ) {
        this.form = fb.group({
            'password': [this.user.password, Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern(this.passwordPattern)])],
            'confirmPassword': [this.user.confirmPassword, Validators.compose([Validators.required, this.passwordMatcher])],
        }
            , {
                validator: this.matchPassword // your validation method
                // validator: this.passwordMatcher // your validation method
            }
        );
    }

    onPasswordFocusOut() {
        this.user.password = (this.user.password && this.user.password.length > 0 ? this.user.password.trim() : this.user.password);
    }

    onConfirmPasswordFocusOut() {
        this.user.confirmPassword = (this.user.confirmPassword && this.user.confirmPassword.length > 0 ? this.user.confirmPassword.trim() : this.user.confirmPassword);
    }

    onClickReset() {
        this.isSubmitted = true;
        this.key = this.activatedRoute.snapshot.queryParams['k'];
        const msg = new Message();

        this._authService.resetPassword(this.user, this.key).subscribe(
            (res) => {
                this.isSubmitted = false;

                // this.user.entityType = res.json().genericResponse.genericBody.data.userData.entityType;
                // this.user.email = res.json().genericResponse.genericBody.data.userData.loginEmail;
                // this.successMsg = res.json().genericResponse.genericBody.message;

                // this.successMsg = res.json();
                this.successMsg = "Updated Successfully . Now you may login \n Redirecting...";

                msg.msg = (res.json() ? res.json() : 'Successfully Updated Password');
                // msg.msg = 'Successfully Updated Password';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');

                // if (this.user.entityType === 'digital_agency' || this.user.entityType === 'influencer_agent') {
                //     setTimeout((router: Router) => {
                //         this._router.navigate(['/login']);
                //     }, 6000);  //6s
                // } else {
                //     setTimeout((router: Router) => {
                //         this._router.navigate(['/login']);
                //     }, 6000);  //6s
                // }
                setTimeout((router: Router) => {
                    this._router.navigate(['/login']);
                }, 6000);  //6s

            },
            (err) => {

                this.isSubmitted = false;
                console.log("err ", err)
                this._authService.errStatusCheck(err);
            }
        );
    }

}
