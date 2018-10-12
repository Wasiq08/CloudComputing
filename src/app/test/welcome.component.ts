import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthService } from '../core/services/auth/iauth.service';
import { CaseService } from '../core/services/case/case.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome';

    isLogin: any;

    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _caseService: CaseService,
        private _router: Router
    ) {
    }

    ngOnInit(): void {

        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        if (!this.isLogin) {
            this._router.navigateByUrl('login');
        }


        // this._caseService.getAccountViaCIF("111").subscribe(
        //     (res) => {

        //         // msg.msg = (res.json() ? res.json() : 'Successfully Updated Password');
        //         // msg.msgType = MessageTypes.Information;
        //         // msg.autoCloseAfter = 400;
        //         // this._uiService.showToast(msg, 'info');
        //     },
        //     (err) => {

        //         // this.isSubmitted = false;
        //         console.log("err ", err);
        //         // this._authService.errStatusCheck(err);
        //     }
        // );



    }

}
