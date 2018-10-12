import { Component, OnDestroy, OnInit } from '@angular/core';
import { UIService } from "../../core/services/ui/ui.service";

@Component({
    selector: 'toast',
    moduleId : module.id,
    templateUrl : 'toast.component.html',
    styleUrls : ['toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
    
    title = 'LCMS';
    msg = 'It is working!';
    iconType = 'info';
    opacity = 0;
    zIndex = 0;
    theme :any;
    notificationAlert = false;
    constructor(private _uiService : UIService){}

    ngOnInit(): void {
        this._uiService.toastStatus.subscribe(
            (msg) => {
                //set title and msg
                this.notificationAlert = false;
                this.title = msg.title;
                this.msg = msg.msg;
                this.iconType = msg.iconType;
                this.opacity = 1;
                this.zIndex = 9999;
                this.theme = "danger";
                window.setTimeout(() => {
                   this.opacity = 0;
                   this.zIndex = 0;
                }, 4000)
            }
        );

        this._uiService.infoToastStatus.subscribe(
            (msg) => {
                // set title and msg
                this.notificationAlert = false;
                this.title = msg.title;
                this.msg = msg.msg;
                this.iconType = msg.iconType;
                this.opacity = 1;
                this.zIndex = 9999;
                this.theme = 'info';
                window.setTimeout(() => {
                    this.opacity = 0;
                    this.zIndex = 0;
                }, 4000);
            }
        );

        this._uiService.notificationToastStatus.subscribe(
            (msg) => {
                // set title and msg
                console.log('notifcation');

                this.notificationAlert = true;
                this.title = msg.title;
                this.msg = msg.msg;
                this.opacity = 1;
                this.zIndex = 9999;
                this.theme = 'warning';
                window.setTimeout(() => {
                    this.opacity = 0;
                    this.zIndex = 0;
                }, 4000);
            }
        );
    }

    ngOnDestroy(): void {
        this._uiService.toastStatus.unsubscribe();
    }

}