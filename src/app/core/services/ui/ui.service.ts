import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Message } from "../../models/message";
// import { HttpService } from "../base/http.service";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs/Observable";


@Injectable()
export class UIService {
    
    /**
     * To keep track of the spinner status
     */
    spinnerStatus = new Subject<boolean>();

    /**
     * To keep track of the modal box
     */
    messageBoxStatus = new Subject<Message>();

    /**
     * To emit show toast events
     */
    toastStatus = new Subject<Message>();
    infoToastStatus = new Subject<Message>();
    notificationToastStatus = new Subject<Message>();
  
    /**
     * Constructor
     */
    constructor(
        // private _http : HttpService
    ){}
    
    
    /**
     * Show Toast
     * Background color depends on MessageType
     * Set autoCloseAfter parameter for auto close 
     * @param msg 
     */
    showToast(msg : Message, type: string){

        //  this.toastStatus.next(msg);
         if (type === 'info') {
            msg.iconType = 'info';
            this.infoToastStatus.next(msg);
        } else if (type === 'notification') {
            msg.iconType = 'info';
            this.notificationToastStatus.next(msg);
        } else {
            msg.iconType = 'error';
            this.toastStatus.next(msg);
        }
    }
    
    /**
     * Show popup modal box
     * Icon depends on MessageType
     * @param msg 
     */
    showMsgBox(msg : Message,){
        this.messageBoxStatus.next(msg);
    }

    closeMsgBox(msg : Message,){
        msg.msg='_cls';
        this.messageBoxStatus.next(msg);
    }

    /**
     * Show Spinner 
     */
    showSpinner() {
        this.spinnerStatus.next(true);
    }

    /**
     * Hide Spinner
     */
    hideSpinner(){
        this.spinnerStatus.next(false);
    }

}