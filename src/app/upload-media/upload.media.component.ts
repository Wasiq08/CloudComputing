import { Component, OnInit, Inject, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../core/models/user';
import { IAuthService } from '../core/services/auth/iauth.service';
import { UIService } from '../core/services/ui/ui.service';
import { WizardService } from '../core/services/ui/wizard.service';
import { Lightbox } from 'angular2-lightbox';


@Component({
    selector: 'upload-media',
    moduleId: module.id,
    templateUrl: 'upload.media.component.html',
    styleUrls: ['upload.media.component.css']
})
export class UploadMediaComponent implements OnInit, OnChanges {


    // @Input() camp: any;
    // @Output() attachmentIds = new EventEmitter<Array<number>>();

    // @Output() attachments = new EventEmitter<Array<any>>();
    // @Output() mediaLinks = new EventEmitter<Array<string>>();

    currentURL: string;
    _albums = new Array<any>();
    isUser: User = new User();
    entityType: string;
    redirectUrl: string;
    isLogin: any;
    componentIndex = 4;
    medialink: string;
    medialinksUrl = new Array<string>();
    fileIds = new Array<number>();
    files = new Array<any>();
    _attachments = new Array<any>();


    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        private _wizardService: WizardService,
        private _lightbox: Lightbox,
        private route: ActivatedRoute, private _router: Router) {
    }

    ngOnInit(): void {

        // this._attachments = this.camp.attachmentIds;

        // console.log('data from parent---', this.camp.attachmentIds);


        // if (this._attachments.length > 0) {
        //     this._attachments.forEach(element => {
        //         console.log('database obj----------', element);
        //         this.files.push(element);
        //     });

        // } else {
        //     this._attachments = [];
        // }

        // this.medialinksUrl = this.camp.campaignMediaLinks;


        // // this.camp.campaignMediaLinks.forEach(element => {
        // //     this.medialinksUrl.push(element.mediaUrl);
        // // })



        // this.isLogin = this._authService.isLoggedIn();

        // if (!this.isLogin) {
        //     this._router.navigateByUrl('login');

        // }


        this._wizardService.onStepChange.subscribe(
            (currentIndex) => {
                currentIndex = currentIndex - 1;
                if (currentIndex === this.componentIndex) {
                    console.log('data send from upload media');
                }
            });


    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    removeAttachment(index) {
        // console.log('a');
        // if (index !== -1) {
        //     this._attachments.splice(index, 1);
        // }
    }



    addItem() {
        // if (this.medialink && (this.medialink.toLocaleLowerCase().indexOf('http') >= 0 ||
        // this.medialink.toLocaleLowerCase().indexOf('https') >= 0)) {
        if (this.medialink && (this.medialink.indexOf('http') >= 0 ||
            this.medialink.indexOf('https') >= 0)) {
            // this.medialink = this.medialink.toLowerCase();
            this.medialinksUrl.push(this.medialink);
            this.medialink = '';
            return;
        } else if (this.medialink) {
            // this.medialink = this.medialink.toLowerCase();
            this.medialink = 'http://' + this.medialink;
            this.medialinksUrl.push(this.medialink);
            this.medialink = '';
        }
        // this.mediaLinks.emit(this.medialinksUrl);
        console.log('final url', this.medialinksUrl);
    }


    removeLink(index) {
        if (index !== -1) {
            this.medialinksUrl.splice(index, 1);
        }
    }

    open(index: number): void {
        // open lightbox
        this._lightbox.open(this._albums, index);
    }

    attachID(value) {
        console.log('iamge object', value);

        //Attachment IDS
        this.fileIds.push(value.fileId);
        //Attachment Object

        this.files.push(value);
        console.log('file attachment value', this.fileIds);
        console.log('image attachment object', this.files);

        // this.attachmentIds.emit(this.files);



    }



    // attach(value) {
    //     this.files.push(value);
    //     console.log("attachments", this.files);

    //     if (this._attachments.length > 0) {
    //         this._attachments.forEach(element => {
    //             this.attachments.emit(this.files);
    //         })
    //     }
    //     this.attachments.emit(this.files);
    // }

    ngOnDestroy() {
        this._attachments = [];
    }

}
