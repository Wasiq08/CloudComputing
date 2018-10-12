import { Component, ElementRef, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Http, Response } from '@angular/http';
import { VideoModule } from '../video/video.component';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { User } from '../../core/models/user';
import { environment } from '../../../environments/environment.prod';
import { Message, MessageTypes } from '../../core/models/message';
import { UIService } from '../../core/services/ui/ui.service';


let URL = '';

@Component({
  selector: 'file-upload',
  templateUrl: './file.upload.component.html',
  styleUrls: ['./file.upload.component.css']
})
export class FileUploadComponent {

  @Input() camp: any;
  @Output() attachmentIds = new EventEmitter<Array<number>>();
  //ramsha
  @Output() attachments = new EventEmitter<Array<any>>();
  @Input() type: string;
  // public uploader: FileUploader = new FileUploader({ url: URL ,additionalParameter:{id:1 , user:3}});
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  user: User = new User();
  apiUrl = environment.apiBaseUrl;
  public checkUpload = true;
  hideQueue = false;

  constructor( @Inject('IAuthService') private _authService: IAuthService,
    private http: Http, private el: ElementRef, private _uiService: UIService
  ) { }

  public fileOverBase(e: any): void {
    console.log('file recived ', e);
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {


    const token = this._authService.getToken();
    this.user = this._authService.getUser();
    let object;


    if (this.type == 'campaign') {
      URL = this.apiUrl + 'campaign/attachment';
      object = { campaignId: this.camp.id, entityId: this.user.entityId };
    }


    if (this.type == 'campaign-edit') {

      URL = this.apiUrl + 'campaign/attachment';
      object = { campaignId: +this.camp, entityId: this.user.entityId };
    } 
    else if (this.type == 'campaign-report') {

      console.log('campaign-report');
      URL = this.apiUrl + 'campaign/report/attachment';
      object = { campaignId: this.camp.campaign.id, entityId: this.user.entityId, socialChannelId: this.camp.socialMediaChannel.id };
    }

    this.uploader = new FileUploader(
      {
        url: URL, additionalParameter: object,
        headers: [{
          name: 'token',
          value: token
        },
        {
          name: 'x-api-version',
          value: '1.1.0',
        }],


      });

    console.log('uploader', this.uploader);
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => {
      this.hideQueue = false;
      console.log('this.hideQueue', this.hideQueue);
      console.log('file property', file);
      file.withCredentials = false;
      this.checkUpload = true;

    };
    console.log('this.uploader.queue', this.uploader.queue);


    // overide the onCompleteItem property of the uploader so we are
    // able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const res = JSON.parse(response);
      if (res && res.genericResponse && res.genericResponse.genericBody) {
        const msg = new Message();
        msg.msg = res.genericResponse.genericBody.message;
        msg.msgType = MessageTypes.Error;
        msg.autoCloseAfter = 400;
        this._uiService.showToast(msg, 'info');
      }

      console.log('ImageUpload:uploaded:', res);
      this.uploader.removeFromQueue(item);
      console.log('this.uploader.queue', this.uploader.queue);
      const attachment = res.genericResponse.genericBody.data.attachment;
      if (attachment) {
        // fildID = res.genericResponse.genericBody.data.attachment.fileId;
        try {
          this.attachmentIds.emit(attachment);
        } catch (error) {
          console.log('error', error);
        }
      }
    };
  }
}
