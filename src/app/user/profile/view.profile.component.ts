import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UserService } from '../../core/services/user/user.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageTypes } from '../../core/models/message';

declare var libraryVar: any;

@Component({
    selector: 'view-profile',
    moduleId: module.id,
    templateUrl: 'view.profile.component.html',
    styleUrls: ['profile.component.css']
})
export class ViewProfileComponent implements OnInit {

    phide = true;
    nphide = true;
    cphide = true;

    currentPass: string = '';
    newPass: string = '';
    confirmPass: string = '';
    isLogin: any;

    form: FormGroup;

    @ViewChild('f') myForm;

    user: User = new User();
    isSubmitted = false;
    successMsg: string;
    // errMsg: string;

    passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,20}$/

    passwordMatcher = (control: AbstractControl): { [key: string]: boolean } => {
        const password = control.get('newPassword');
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
        let password = AC.get('newPassword').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (confirmPassword) {
            if (password != confirmPassword) {
                console.log('false');
                AC.get('confirmPassword').setErrors({ matchPassword: true });
            } else {
                console.log('true');
                AC.get('confirmPassword').setErrors(null)
                return null
            }
        }

    }

    constructor( @Inject('IAuthService') private _authService: IAuthService,
        private _router: Router, private activatedRoute: ActivatedRoute,
        private _uiService: UIService, private fb: FormBuilder,
        private _userService: UserService
    ) {
        this.form = fb.group({
            'currentPassword': [this.currentPass, Validators.compose([Validators.required])],
            'newPassword': [this.newPass, Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern(this.passwordPattern)])],
            'confirmPassword': [this.confirmPass, Validators.compose([Validators.required, this.passwordMatcher])],
        }
            , {
                validator: this.matchPassword // your validation method
                // validator: this.passwordMatcher // your validation method
            }
        );
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        if (!this.isLogin) {
            this._router.navigateByUrl('login');
        } else {

        }
    }

    onCurrentPasswordFocusOut() {
        this.currentPass = (this.currentPass && this.currentPass.length > 0 ? this.currentPass.trim() : this.currentPass);
    }

    onNewPasswordFocusOut() {
        this.newPass = (this.newPass && this.newPass.length > 0 ? this.newPass.trim() : this.newPass);
    }

    onConfirmPasswordFocusOut() {
        this.confirmPass = (this.confirmPass && this.confirmPass.length > 0 ? this.confirmPass.trim() : this.confirmPass);
    }

    onClickReset() {
        this.isSubmitted = true;

        const msg = new Message();

        this._userService.updateUserPassword(this.user.id, this.currentPass, this.newPass).subscribe(
            (res) => {
                this.isSubmitted = false;

                // this.currentPass = "";
                // this.newPass = "";
                // this.confirmPass = "";
                this.myForm.resetForm();
                // this.successMsg = res.json();
                // this.successMsg = "Updated Successfully . Now you may login \n Redirecting...";

                msg.msg = (res.json() ? res.json() : 'Successfully Updated Password');
                // msg.msg = 'Successfully Updated Password';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
            },
            (err) => {

                this.isSubmitted = false;
                console.log("err ", err);
                this._authService.errStatusCheck(err);
            }
        );
    }


}
