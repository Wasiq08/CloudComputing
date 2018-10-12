import { Component, OnInit, Inject } from '@angular/core';
import { UIService } from '../../core/services/ui/ui.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
// import { Sidebar } from '../../core/models/nav/sidebar';


@Component({
    selector: 'auth-header',
    moduleId: module.id,
    templateUrl: 'auth-header.component.html',
    styleUrls: ['../auth.component.css'],
    // host: {
    //     '(window:scroll)': 'updateHeader($event)'
    // }
})
export class AuthHeader implements OnInit {

    // headers = new Array<Sidebar>();
    // footers = new Array<Sidebar>();
    // logo: any;

    // // Header Event
    // isCollapsed: boolean;
    // isScrolled = false;
    // currPos: Number = 0;
    // startPos: Number = 0;
    // changePos: Number = 500;
    // backgroundImage: any;
    // logogram: any;

    constructor(
        @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        private route: ActivatedRoute,
        private _router: Router
    ) {
        // this.isCollapsed = false;
    }

    ngOnInit(): void {
        // this._uiService.platformSettings().subscribe(
        //     (res) => {
        //         this.headers = res.header;
        //         this.footers = res.footer;
        //         this.logo = res.logo.original;
        //     },
        //     (err) => {

        //     }
        // );
    }

    // updateHeader(evt) {
    //     this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
    //     if (this.currPos >= this.changePos) {
    //         this.isScrolled = true;
    //     } else {
    //         this.isScrolled = false;
    //     }
    // }

    // navigate(link) {
    //     const url = (link === 'login') ? 'login' : 'registration';
    //     this._router.navigateByUrl(link);
    // }
}
