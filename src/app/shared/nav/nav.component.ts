import { Component, OnInit, Inject, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { IAuthService } from "../../core/services/auth/iauth.service";
import { RoutingInfoService } from "../../core/services/routInfo/route.info.service";
import { UIService } from "../../core/services/ui/ui.service";
import { Message } from "../../core/models/message";
import { User } from "../../core/models/user";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'nav-bar',
    moduleId: module.id,
    templateUrl: 'nav.component.html'
})
export class NavComponent implements OnInit, OnDestroy {
    user: User = new User();
    // constructor(@Inject('IAuthService') private _authService : IAuthService,
    //             private _routingService : RoutingInfoService) {}
    // constructor( @Inject('IAuthService') private _authService: IAuthService,
    //     private route: ActivatedRoute, private _router: Router,
    //     private _uiService: UIService) { }

    

    ngOnInit(): void {

        // this.user = this._authService.getUser();

        // this._authService.loginStatusChanged.subscribe(
        //     (user) => {
        //         this.user = user;
        //         console.log("User getting in nav:", this.user);
        //     },
        //     (error) => console.error(error),
        //     () => console.log('Login state has been marked completed!')
        // );

    }

    ngOnDestroy(): void {
        //this._authService.loginStatusChanged.unsubscribe();
    }

    // onShow(event): void {
    //     console.log('trying to show the toast')
    //     // this._routingService.getRoutes('admin').subscribe(
    //     //     res => console.log(res),
    //     //     error => console.error(error)
    //     // );
    //     // this._authService.checkLogin('','');
    //     // console.log(this._authService.getLoggedinUser());
    //     // let msg = new Message();
    //     // msg.title = 'Testing';
    //     // msg.msg = 'Test message';
    //     // this._uiService.showToast(msg);
    // }
    
    // onHide(): void {
    //     // this._uiService.hideSpinner();
    // }

    // showMsg(event) {
    //     console.log('Show msg has been clicked');
    //     let msg = new Message();
    //     msg.title = 'Testing';
    //     msg.msg = 'Test message';
    //     msg.onOkBtnClick = () => {
    //         alert('Msg-ok has been clicked');
    //     }
    //     msg.onCancelBtnClick = () => {
    //         alert('Msg-cancel has been clicked');
    //     }
    //     this._uiService.showMsgBox(msg);
    // }

    // getProfile() {
    //     if (!this.user) return;

    //     if (this.user.entityType === 'brand') {
    //         this._router.navigate(['brand-profile']);
    //     }
    //     if (this.user.entityType === 'influencer') {
    //         this._router.navigate(['influencer-profile']);
    //     }
    // }
    // getHome() {
    //     if (this.user.entityType === 'brand') {
    //         this._router.navigate(['home']);
    //     }
    //     if (this.user.entityType === 'influencer') {
    //         this._router.navigate(['home']);
    //     }
    // }

    // searchInfluencer(){
    //     this._router.navigate(['influencer-search']);
    // }

    // startCampaign(){

    //     this._router.navigate(['create-campaign']);
    // }
    // brandCampaignList(){
    //     this._router.navigate(['brand-campaign-list']);

    // }
    // influencerCampaignList(){
    //     this._router.navigate(['influencer-campaign-list']);

    // }


    
}