import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../core/models/user';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { ScriptService } from '../core/services/script.service';
// import { UtilityService } from '../core/services/general/utility.service';
// import { MessagingService } from '../messaging.service';
// import { DashboardService } from '../core/services/general/dashboard.service';
// import { Dashboard } from '../core/models/dashboard';
import { Message, MessageTypes } from '../../core/models/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { InfluencerProfile } from '../core/models/influencer/influencer.profile';
// import { EasyPay } from '../core/models/payment/easypay.payment';
import { MatPaginator, MatTableDataSource } from '@angular/material';

declare var libraryVar: any;

@Component({
    selector: 'case-create',
    moduleId: module.id,
    templateUrl: 'case.create.component.html',
    styleUrls: ['../case.component.css']
})
export class CaseCreateComponent implements OnInit {
    files: any;
    // dashboard: Dashboard = new Dashboard();
    currentURL: string;
    // script = new ScriptService();

    list = [
        {
            caseNo: "test",
            accountNo: "test",
            caseDetails: "test",
            userAction: "test",
        }
    ]
    isUser: User = new User();
    user: User = new User();
    redirectUrl: string;
    redirectUrl2: string;
    isLogin: any;
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    CaseAttorney:FormGroup;
    DefaulterPersonalInformation:FormGroup;
    DefaulterAccountInformation:FormGroup;
    DefaulterCompanyDirector:FormGroup;
    DefaulterLoanFinance:FormGroup;
    DefaulterLoanSpecificationDetials:FormGroup;
    charge:FormGroup;
    DefaulterDocumentList:FormGroup;
    LawyerRecommandation:FormGroup;
    final:FormGroup;
    displayedColumns = ['caseNo', 'accountNo', 'caseDetails', 'userAction'];
    dataSource = new MatTableDataSource(this.list);

  

    constructor( @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        // public _messaging: MessagingService,
        // private _dashboardService: DashboardService,
        // private _utility: UtilityService,
        private route: ActivatedRoute, private _router: Router,private _formBuilder: FormBuilder) {
        this.currentURL = window.location.href;
    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
          });
          this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
          });
          this.CaseAttorney = this._formBuilder.group({
            caseattorneyCtrl: ['', Validators.required]
          });
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
        }

        // this.loadDashboard(this.user.entityType);

    }




}
