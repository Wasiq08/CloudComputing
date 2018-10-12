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
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'region-list',
    templateUrl: 'region.component.html',
    styleUrls: ['../setup.forms.css', '../../admin.component.css']
})
export class RegionComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // region: Region = new Region();

    countries: Country[] = [];
    countryId: number;
    newCountryId: number;
    regions: Region[] = [];
    addStatus = true;
    updateStatus = true;
    deleteStatus = true;
    user: User = new User();

    displayedColumns = ['regionName', 'action'];
    dataSource = new MatTableDataSource<Region>(this.regions);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    isSpinner = false;
    filter: string = "";

    constructor( @Inject('IAuthService')
    private _authService: IAuthService,
        private _uiService: UIService,
        private _router: Router,
        // private utilityService: UtilityService,
        public dialog: MatDialog,
        private activateRoute: ActivatedRoute,
        private _setupService: AdminSetupService,
        private _locationService: LocationService,
    ) {

    }

    ngOnInit(): void {
        // Applying permission
        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();
        // this.addStatus = this.utilityService.checkUserPermission(this.user, 'bo_add_records');
        // this.updateStatus = this.utilityService.checkUserPermission(this.user, 'bo_update_records');
        // this.deleteStatus = this.utilityService.checkUserPermission(this.user, 'bo_delete_records');
        this.loadCountryList();
        // this.loadRegionList();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    refreshList() {
        this.isSpinner = true;
        this.filter = "";
        this.dataSource.filter = null;
        const msg = new Message();
        if (this.newCountryId) {
            this.loadRegionViaId(this.newCountryId);
        }
        else {
            msg.msg = 'Please, select country';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            this.isSpinner = false;
        }
    }

    loadCountryList() {

        this._locationService.getCountries().subscribe(
            (res) => {
                this.countries = res.json();
                // console.log(this.countries);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    // on change or focusout
    onCountryFocusOut(countryId) {
        // console.log("testtt", this.newCountryId)

        if (this.countryId !== +this.newCountryId) {
            const country = this.countries.filter(c => c.id === +this.newCountryId);
            this.regions = [];

            this.dataSource = new MatTableDataSource<Region>(this.regions);
            this.dataSource.paginator = this.paginator;

            if (country.length === 0) {
                // this.isCountryValid = false;
                this.newCountryId = null;
                this.countryId = this.newCountryId;
                // this.loadRegionViaId(0);
                return;
            }
            // this.isCountryValid = true;
            this.newCountryId = country[0].id;
            this.countryId = this.newCountryId;

            this.loadRegionViaId(this.newCountryId);
        }
    }

    loadRegionViaId(id) {
        this.isSpinner = true;
        const msg = new Message();

        this._locationService.getRegionsViaCountryId(id).subscribe(
            (res) => {
                this.regions = res.json();
                // console.log(this.regions);
                this.dataSource = new MatTableDataSource<Region>(this.regions);
                this.dataSource.paginator = this.paginator;

                if (this.regions.length == 0) {
                    msg.msg = 'No Regions Found';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                }
                this.isSpinner = false;
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
                this.isSpinner = false;
            }
        );

    }

    loadRegionList() {
        this.isSpinner = true;
        const msg = new Message();
        this._setupService.getRegions().subscribe(
            (res) => {
                this.regions = res.json();
                // console.log(this.regions);
                this.dataSource = new MatTableDataSource<Region>(this.regions);
                this.dataSource.paginator = this.paginator;

                if (this.regions.length == 0) {
                    msg.msg = 'No Regions Found';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                }
                this.isSpinner = false;
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
                this.isSpinner = false;
            }
        );
    }

    addField(field) {
        const dialogRef = this.dialog.open(AddRegionField, {
            width: '450px',
            data: { field, countries: this.countries }
        });
        dialogRef.afterClosed().subscribe(result => {
            // this.loadRegionList();
            this.newCountryId = result && result.countryId ? result.countryId : this.newCountryId;
            if(this.newCountryId){
                this.filter = "";
                this.dataSource.filter = null;
                this.loadRegionViaId(this.newCountryId);
            }
            // else{
            //     this.refreshList();
            // }
        });
    }

    onEdit(value, id, name, tooltip, placeholder, coId) {
        // console.log('value', value, '---id', id);
        const dialogRef = this.dialog.open(EditRegionField, {
            width: '450px',
            data: { value, id, name, tooltip, placeholder, coId, countries: this.countries }
        });
        dialogRef.afterClosed().subscribe(result => {
            // this.loadRegionList();
            this.newCountryId = result && result.countryId ? result.countryId : this.newCountryId;
            this.filter = "";
            this.dataSource.filter = null;
            this.loadRegionViaId(this.newCountryId);
        });
    }

    onDelete(value, id, name) {
        const dialogRef = this.dialog.open(DeleteRegionField, {
            width: '450px',
            data: { value, id, name }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {
            // this.loadRegionList();
            this.filter = "";
            this.dataSource.filter = null;
            this.loadRegionViaId(this.newCountryId);
        });
    }
}


@Component({
    selector: 'add-region',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class AddRegionField {

    title = "Add New Region";
    region: Region = new Region();
    countries: Country[] = [];
    // country: Country = new Country();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<AddRegionField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        this.countries = data.countries;

        // console.log('region', this.region);
        // console.log('data', this.fieldType);
        this.form = fb.group({
            'countryId': [this.region.countryId, Validators.required],
            'regionName': [this.region.regionName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
        });

    }

    onRegionFocusOut() {
        this.region.regionName = (this.region.regionName && this.region.regionName.length > 0 ? this.region.regionName.trim() : this.region.regionName);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.addRegion(this.region).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully added an region';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close(this.region);
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}


@Component({
    selector: 'edit-region',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class EditRegionField {

    title = "Edit Region";
    region: Region = new Region();
    countries: Country[] = [];
    // country: Country = new Country();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<EditRegionField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.value;
        this.countries = data.countries;
        console.log('data', data);

        if (this.fieldType === 'region') {
            this.region.id = data.id;
            this.region.regionId = data.id;
            this.region.regionName = data.name;
            this.region.countryId = data.coId;
        }
        console.log('this.region', this.region);

        this.form = fb.group({
            'countryId': [this.region.countryId, Validators.required],
            'regionName': [this.region.regionName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
        })
    }

    onRegionFocusOut() {
        this.region.regionName = (this.region.regionName && this.region.regionName.length > 0 ? this.region.regionName.trim() : this.region.regionName);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.updateRegion(this.region).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully updated an region';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close(this.region);
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}



@Component({
    selector: 'delete-region',
    templateUrl: '../../../dialogs/admin.confirm.field.delete.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeleteRegionField {
    fieldType: string;
    id: number;
    name: string;
    constructor(
        public dialogRef: MatDialogRef<DeleteRegionField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
    ) {
        this.fieldType = data.value;
        this.id = data.id;
        this.name = data.name;
        console.log('data', this.fieldType);

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.deleteRegion(this.id).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully deleted an region';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close();
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }
}




