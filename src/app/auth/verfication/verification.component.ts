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
    templateUrl: 'verification.component.html',
    styleUrls: ['../auth.component.css']
})
export class VerificationComponent implements OnInit {
    currentURL = '';
    key: string;
    private sub: any;
    errMsg: string;
    successMsg: string;
    role: string;
    email: string;
    isSubmitted = false;
    user: User = new User();
    checkUser: any;
    resendEmail = false;
    hideResend = false;
    subscription: any;
    subscriptionRequired: boolean;
    showPaymentPage = false;
    // stripePayment  = new MakePaymentComponent();
    subscriptionAmount = 0;
    form: FormGroup;

    constructor( @Inject('IAuthService') private _authService: IAuthService, private _uiService: UIService,
        private route: ActivatedRoute, private _router: Router, private fb: FormBuilder
    ) {
        this.currentURL = window.location.href;
        this.form = fb.group({
            'key': [this.key, Validators.compose([Validators.required])]
        });
    }


    ngOnInit() {

        this.route.params.subscribe((params: any) => {

            if (this.route.snapshot.queryParams['k']) {
                this.key = this.route.snapshot.queryParams['k'];
                this.verifyKey();
            } else {

                // this.checkUser = this._authService.getUser();
                // if (this.checkUser) {
                //     this.user.email = this._authService.getUser().email;
                //     this.user.entityType = this._authService.getUser().entityType;

                //     // console.log(this.checkUser);
                // } else {
                //     const msg = new Message();
                //     msg.msg = 'Sorry, your session has expired.';
                //     msg.msgType = MessageTypes.Error;
                //     msg.autoCloseAfter = 400;
                //     this._uiService.showToast(msg, '');
                // }
            }
        });
    }

    keyFocusOut() {
        this.key = (this.key && this.key.length > 0 ? this.key.trim() : this.key);
    }

    verifyKey() {
        this.isSubmitted = true;
        this._authService.verifyKey(this.key).subscribe(
            (res) => {
                this.isSubmitted = false;

                // this.role = res.json().genericResponse.genericBody.data.userData.entityType;
                // this.email = res.json().genericResponse.genericBody.data.userData.loginEmail;
                // this.subscription = res.json().genericResponse.genericBody.data.userData.subscription;
                // this.subscriptionRequired = res.json().genericResponse.genericBody.data.userData.subscriptionRequired || false;
                try {
                    // this.subscriptionAmount = this.subscription.plan.pricing[0].netAmount;
                } catch (err) {
                }
                const msg = new Message();
                // msg.msg = "Congratulations! Your account has been successfully verified. Please wait while redirecting to login...";
                msg.msg = "Successfully verified";
                msg.msgType = MessageTypes.Confirmation;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');

                setTimeout((router: Router) => {
                    this._router.navigate(['/login']);
                }, 3000);
            },
            (err) => {
                console.log(err);
                this.isSubmitted = false;
                const msg = new Message();
                if (err.status === 400) {
                    msg.msg = 'Invalid or Expired key';
                    msg.msgType = MessageTypes.Error;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, '');
                } else {
                    msg.msg = 'Sorry, an error has occured.';
                    msg.msgType = MessageTypes.Error;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, '');
                }
            }
        );
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

