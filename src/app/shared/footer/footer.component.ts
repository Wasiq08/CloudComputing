import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UIService } from '../../core/services/ui/ui.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { RoutingInfoService } from '../../core/services/routInfo/route.info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Message } from '../../core/models/message';


@Component({
    selector: 'secure-footer',
    moduleId: module.id,
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        private route: ActivatedRoute, private _router: Router,
    ) {

    }
    ngOnInit(): void {

    }


    ngOnDestroy(): void {

    }

}
