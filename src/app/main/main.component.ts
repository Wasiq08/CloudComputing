import { Component, OnInit, OnDestroy } from '@angular/core'
// import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UIService } from '../core/services/ui/ui.service'
import { AuthService } from '../core/services/auth/auth.service'
// import { StatusService } from '../../core/services/user/status.service'
// import { User } from '../core/models/user'
import { Router } from '@angular/router';
import { Message, MessageTypes } from "../core/models/message";
import { MaterialModule } from '../material/material.module';


@Component({
    selector: 'main',
    moduleId: module.id,
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit {

    // Mainpage = "none";
    // Loginpage = "block";
    // Loadingpage = "none";
    // signin: boolean;
    // user: User = new User();
    successResponse: any;
    errorResponse: any;
    errMsg: string;


    constructor(
        private _authServices: AuthService,
        private _uiServices: UIService, private _router: Router,
        // private _statusService: StatusService
    ) {

    }

    ngOnInit(): void {

    }
}
