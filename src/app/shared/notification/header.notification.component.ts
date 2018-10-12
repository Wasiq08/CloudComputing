import { Component, OnInit, Inject, OnChanges, SimpleChanges, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { Notifications } from '../../core/models/notification/notification';
// import { NotificationService } from '../../core/services/general/notification.service';
import { NotificationArray } from '../../core/models/notification/notification.array';


@Component({
    selector: 'header-notification',
    moduleId: module.id,
    templateUrl: 'header.notification.component.html',
    styleUrls: ['../header/header.component.css']
})
export class HeaderNotificationComponent implements OnInit, OnChanges {

    isLogin: any;
    user: User = new User();
    @Input() notif: Notifications = new Notifications();
    @Output() onNotifClick = new EventEmitter<any>();
    showAllNotif = new Array<NotificationArray>();
    profilePic: any;
    countNotif: number;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService, private _uiService: UIService,
        private route: ActivatedRoute, private _router: Router,
        // private _notifService: NotificationService
    ) {
    }

    ngOnInit(): void {

        // this.isLogin = this._authService.isLoggedIn();
        // if (!this.isLogin) {
        //     this._router.navigateByUrl('login');
        // }

    }
    ngOnChanges(changes: SimpleChanges): void {
        // console.log("notification data", this.notif.notification);
        // if (this.notif.notification) {
        //     this.showAllNotif = this.notif.notification.all;
        // }
    }

    updateNotifications(id) {

        // this._notifService.updateNotifications(id).subscribe(
        //     (res) => {
        //         console.log('Notification response:', res);
        //         this.onNotifClick.emit('update notification');
        //         // this.getNotifications();
        //     },
        //     (error) => console.error(error)
        // );
    }


    readMe(id, url) {
        // console.log("read a notifcation");
        this.updateNotifications(id);
        this._router.navigate([url]);
    }

    viewAll() {
        console.log('view all notifications');
        this._router.navigateByUrl('notification');
    }

}
