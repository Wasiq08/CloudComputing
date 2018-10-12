import { Component, Input, OnInit, Inject, Output, EventEmitter, AfterViewInit, ViewChildren, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { IAuthService } from '../../../core/services/auth/iauth.service';
import { UIService } from '../../../core/services/ui/ui.service';
import { Message, MessageTypes } from '../../../core/models/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminSetupService } from '../../../core/services/admin/admin.setup.service';
import { LocationService } from '../../../core/services/location/location.service';
import { Country } from '../../../core/models/country';
import { Region } from '../../../core/models/region';
import { City } from '../../../core/models/city';
import { Department } from '../../../core/models/department';
import { Branch } from '../../../core/models/branch';
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';

import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'manage-branch',
    templateUrl: 'manage.branch.component.html',
    styleUrls: ['../setup.forms.css', '../../admin.component.css']
})
export class ManageBranchComponent implements OnInit {

    isLogin: any;

    user: User = new User();


    step = [
        {
            id: 0,
            selected: true
        },
        {
            id: 1,
            selected: true
        },
        {
            id: 2,
            selected: true
        }
    ];

    constructor( @Inject('IAuthService')
    private _authService: IAuthService,
        private _uiService: UIService,
        private _router: Router,
        // private utilityService: UtilityService,
        public dialog: MatDialog,
        private activateRoute: ActivatedRoute,
        private _setupService: AdminSetupService,
        private _locationService: LocationService
    ) {

    }

    ngOnInit(): void {
        // Applying permission
        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();
    }
    
}


@Component({
    selector: 'manage-add-branch',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class ManageAddBranchField {

}


@Component({
    selector: 'manage-edit-branch',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class ManageEditBranchField {

}



@Component({
    selector: 'manage-delete-branch',
    templateUrl: '../../../dialogs/admin.confirm.field.delete.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class ManageDeleteBranchField {

}

