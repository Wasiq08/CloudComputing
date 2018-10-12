import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UIService } from '../../core/services/ui/ui.service';
// import { NotificationService } from '../../core/services/general/notification.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
// import { Notifications } from '../../core/models/notification/notification';
import { RoutingInfoService } from '../../core/services/routInfo/route.info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../core/models/user';
import { Observable } from 'rxjs/Rx';
import { Message } from '../../core/models/message';
// import { ScriptService } from '../../core/services/script.service';
// import { DashboardService } from '../../core/services/general/dashboard.service';
// import { Sidebar } from '../../core/models/nav/sidebar';
import { ISubscription } from "rxjs/Subscription";


@Component({
    selector: 'sidebar',
    moduleId: module.id,
    templateUrl: 'sidebar.component.html',
    styleUrls: ['../header/header.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

    isLogin: any;
    // notif: Notifications = new Notifications();
    countNotif: number;
    user: User = new User();
    // script = new ScriptService();
    showNav: boolean;
    private updateInfo: ISubscription;

    isUser: User = new User();
    entityType: string;
    redirectUrl: string;
    profilePic: any;

    // navigation: {
    //     sidebar: Sidebar;
    // };
    navShow = false;
    expandedIndex = -1;
    logo: any;
    overAllUnreadStatus = false;

    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _dashboard: DashboardService,
        private route: ActivatedRoute, private _router: Router,
        // private _notifService: NotificationService
    ) {
        // this.script.loadScript('commetchat')
        //     .then(data => {
        //         console.log('script loaded ', data);
        //     }).catch(error => console.log(error));
    }
    ngOnInit(): void {
        // To get Social CxN logo

        // this._uiService.platformSettings().subscribe(
        //     (res) => {
        //         this.logo = res.logo.original;
        //     });

        this.user = this._authService.getUser();
        console.log(this.user);
        // this.profilePic = this.user.profilePic.thumbnails.square;

        console.log('this.profilePic ', this.profilePic);

        this._authService.loginStatusChanged.subscribe(
            (user) => {
                this.user = user;
            },
            (error) => console.error(error),
            () => console.log('Login state has been marked completed!')
        );

        // this._uiService.navigationService().subscribe(
        //     (res) => {
        //         console.log('Response nav:', res);
        //         if (res.navigations.sidebar.length > 0) {
        //             this.navigation = res.navigations;
        //             console.log('this.sidebarMenu', this.navigation);
        //             console.log('this.sidebar', this.navigation.sidebar);
        //         }

        //     },
        //     (error) => console.error(error),
        // );

        this.isLogin = this._authService.isLoggedIn();

        if (!this.isLogin) {
            this._router.navigateByUrl('login');
        }

        this.user = this._authService.getUser();
        console.log(this.user);

        // this.profilePic = this.user.profilePic.thumbnails.square ? this.user.profilePic.thumbnails.square : null;
        console.log('this.profilePic ', this.profilePic);

        if (this.isLogin) {
            // for updating notifications count on every 10 seconds
            this.updateInfo = Observable.interval(1000 * 1500000).subscribe(x => {
                this.getNotifications();
                this.getChatMessagesStatus();
            });

        }

        this.getNotifications();
        this.getChatMessagesStatus();
    }

    getNotifications() {
        const post = {
            offsetValue: 0,
            limitValue: 10
        };
        // this._notifService.getNotifications(post).subscribe(
        //     (res) => {
        //         this.notif = res;
        //         console.log('Notification response:', this.notif);
        //         if (this.notif.notification.totalUnread > 0) {
        //             this.countNotif = this.notif.notification.totalUnread;
        //         }
        //     },
        //     (error) => console.error(error)
        // );
    }

    getChatMessagesStatus() {

        // this._notifService.getChatMessagesStatus().subscribe(
        //     (res) => {
        //         this.overAllUnreadStatus = res.overAllUnreadStatus;
        //         // console.log('data-------' ,res.overAllUnreadStatus);
        //     },
        //     (error) => console.error(error)
        // );

    }

    onNotifClick(event) {
        console.log('event', event);
        this.getNotifications();
    }

    onProfileClick() {
        // if (this.user.entityType === 'brand') {
        //     this._router.navigateByUrl('brand/profile');
        // } else if (this.user.entityType === 'influencer') {
        //     this._router.navigateByUrl('influencer/profile');
        // } else if (this.user.entityType === 'digital_agency') {
        //     this._router.navigateByUrl('da/profile');
        // } else if (this.user.entityType === 'influencer_agent') {
        //     this._router.navigateByUrl('ia/profile');
        // }
    }

    onProfileViewClick() {

        // if (this.user.entityType === 'brand') {
        //     this._router.navigateByUrl('brand/view/profile');
        // } else if (this.user.entityType === 'influencer') {
        //     this._router.navigateByUrl('influencer/view/profile');
        // } else if (this.user.entityType === 'digital_agency') {
        //     this._router.navigateByUrl('da/view/profile');
        // } else if (this.user.entityType === 'influencer_agent') {
        //     this._router.navigateByUrl('ia/view/profile');
        // }
    }

    onChangePasswordClick(){
        this._router.navigateByUrl('user/change-password');
    }

    onlogOut() {
        // this.entityType = this._authService.getUser().entityType;
        // console.log('entity type:', this.entityType);

        this.redirectUrl = 'login';
        // if (this.entityType === 'influencer' || this.entityType === 'brand') {
        //     this.redirectUrl = '/';
        // } else if (this.entityType === 'digital_agency' || this.entityType === 'influencer_agent') {
        // this.redirectUrl = 'login';
        // } else if (this.entityType === 'backoffice') {
        //     this.redirectUrl = 'admin/login';
        // }

        // this._dashboard.logout().subscribe(
        //     (res) => {
        //     });
        this._authService.logoutUser();

        this.isUser = this._authService.getUser();
        if (this.isUser) {
            return;
        } else {
            this._router.navigate([this.redirectUrl]);
        }
    }

    ngOnDestroy(): void {
        this.updateInfo.unsubscribe();
    }

    expandRow(index: number): void {
        this.expandedIndex = index === this.expandedIndex ? -1 : index;
    }

    onShow(event): void {
        console.log('trying to show the toast');
    }

    onHide(): void {
        // this._uiService.hideSpinner();
    }

    showMsg(event) {
        console.log('Show msg has been clicked');
        const msg = new Message();
        msg.title = 'Testing';
        msg.msg = 'Test message';
        msg.onOkBtnClick = () => {
            alert('Msg-ok has been clicked');
        };
        msg.onCancelBtnClick = () => {
            alert('Msg-cancel has been clicked');
        };
        this._uiService.showMsgBox(msg);
    }

    getProfile() {
        // if (!this.user) { return; }

        // if (this.user.entityType === 'brand') {
        //     this._router.navigate(['brand/profile']);
        // }
        // if (this.user.entityType === 'influencer') {
        //     this._router.navigate(['influencer/profile']);
        // }
    }


    navigate(path) {
        // this._router.navigate([{ outlets: { primary: path, sidemenu: path } }],
        //     { relativeTo: this.route });
        this._router.navigateByUrl(path);
        this.showNav = !this.showNav;
    }

    getHome() {
        this._router.navigate(['home']);
    }
}
