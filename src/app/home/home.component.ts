import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../core/models/user';
import { IAuthService } from '../core/services/auth/iauth.service';
import { UIService } from '../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { ScriptService } from '../core/services/script.service';
// import { UtilityService } from '../core/services/general/utility.service';
// import { MessagingService } from '../messaging.service';
// import { DashboardService } from '../core/services/general/dashboard.service';
// import { Dashboard } from '../core/models/dashboard';
import { Message, MessageTypes } from '../core/models/message';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';

declare var libraryVar: any;

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    isUser: User = new User();
    user: User = new User();
    // entityType: string;
    redirectUrl: string;
    redirectUrl2: string;
    isLogin: any;
    showPaymentMessage = false;
    message;
    subscriptionAmount: number;
    subscription: any;
    // influencerProfile = new InfluencerProfile();
    // easyPay = new EasyPay();

    constructor( @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        // public _messaging: MessagingService,
        // private _dashboardService: DashboardService,
        // private _utility: UtilityService,
        private route: ActivatedRoute, private _router: Router) {
        this.currentURL = window.location.href;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();
        // console.log('this.isLogin', this.isLogin);

        //asking user for notification permission;
        // this._messaging.getPermission();
        //show notification messgages
        // this._messaging.receiveMessage();
        // this.message = this._messaging.currentMessage;
        // if (this.message.notification) {
        //     const msg = new Message();
        //     msg.title = this.message.notification.title ? this.message.notification.title : '';
        //     msg.msg = this.message.notification.body ? this.message.notification.body : '';
        //     msg.msgType = MessageTypes.Information;
        //     msg.iconType = this.message.notification.icon ? this.message.notification.icon : '';
        //     msg.autoCloseAfter = 400;
        //     // this.uiService.showToast(msg, "info");
        //     // this._uiService.showToast(msg, 'notification');
        //     this._uiService.showToast(msg);
        // }


        if (!this.isLogin) {
            this._router.navigateByUrl('login');
        } else {

            this._router.navigateByUrl('admin/home');

        }

        // this.loadDashboard(this.user.entityType);

    }

    loadDashboard(entityType) {
        // this._uiService.showSpinner();
        // this._dashboardService.getDashboard(entityType).subscribe(
        //     (res) => {
        //         this._uiService.hideSpinner();
        //         this.dashboard = res.dashboard;
        //         this.files = res.dashboard.caseStudies.files;
        //         console.log('dashboard', this.dashboard);
        //         this.influencerProfile = res.dashboard.influencerOfTheMonth.profile;
        //     },
        //     (err) => {
        //         this._uiService.hideSpinner();
        //     }
        // );
    }

    navigateTo(id) {
        // console.log('navigation ID', id);

        // if (this.user.entityType === 'brand' ) {
        //     this._router.navigateByUrl('brand/campaign/details/' + id);
        // } else if (this.user.entityType === 'influencer' ) {
        //     // this._router.navigate(['influencer/campaign/details/'],id);
        //     this._router.navigateByUrl('influencer/campaign/details/' + id);

        // } else if (this.user.entityType === 'digital_agency' ) {
        //     this._router.navigateByUrl('da/campaign/details/' + id);
        // } else if (this.user.entityType === 'influencer_agent' ) {
        //     this._router.navigateByUrl('ia/campaign/details/' + id);
        // }

    }

    // viewAllCampaigns() {
    //     if (this.user.entityType === 'brand' ) {
    //         this._router.navigate(['brand/campaign/list']);
    //     } else if (this.user.entityType === 'influencer' ) {
    //         this._router.navigate(['influencer/campaign/list/']);
    //     } else if (this.user.entityType === 'digital_agency' ) {
    //         this._router.navigate(['da/campaign/list']);
    //     } else if (this.user.entityType === 'influencer_agent' ) {
    //         this._router.navigate(['ia/campaign/list']);
    //     }
    // }


    onlogOut() {
        // this.script.removejscssfile('filestack.js', 'js', 'chat');

        // this.entityType = this._authService.getUser().entityType;
        // console.log('entity type:', this.entityType);

        this.redirectUrl = 'login';
        this.redirectUrl2 = 'home';

        // if (this.entityType === 'influencer' || this.entityType === 'brand') {
        //     this.redirectUrl = 'login';
        // } else if (this.entityType === 'digital_agency' || this.entityType === 'influencer_agent') {
        //     this.redirectUrl = 'login';
        // } else if (this.entityType === 'backoffice') {
        //     this.redirectUrl = 'admin/login';
        // }

        this._authService.logoutUser();
        this.isUser = this._authService.getUser();
        if (this.isUser) {
            this._router.navigateByUrl(this.redirectUrl2);
            // return;
        } else {
            this._router.navigateByUrl(this.redirectUrl);
        }
    }


}
