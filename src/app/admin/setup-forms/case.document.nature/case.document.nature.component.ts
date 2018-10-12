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
import { CaseDocumentNature } from '../../../core/models/caseDocumentNature';
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'caseDocumentNature-list',
    templateUrl: 'case.document.nature.component.html',
    styleUrls: ['../setup.forms.css', '../../admin.component.css']
})
export class CaseDocumentNatureComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // caseDocumentNature: CaseDocumentNature = new CaseDocumentNature();
    caseDocumentNatures: CaseDocumentNature[] = [];
    addStatus = true;
    updateStatus = true;
    deleteStatus = true;
    user: User = new User();

    displayedColumns = ['caseDocumentNature', 'action'];
    dataSource = new MatTableDataSource<CaseDocumentNature>(this.caseDocumentNatures);
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
    ) {

    }

    ngOnInit(): void {
        // Applying permission
        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();
        // this.addStatus = this.utilityService.checkUserPermission(this.user, 'bo_add_records');
        // this.updateStatus = this.utilityService.checkUserPermission(this.user, 'bo_update_records');
        // this.deleteStatus = this.utilityService.checkUserPermission(this.user, 'bo_delete_records');
        this.loadCaseDocumentNatureList();
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
        this.loadCaseDocumentNatureList();
    }

    loadCaseDocumentNatureList() {
        this.isSpinner = true;
        const msg = new Message();
        this._setupService.getCaseDocumentNatures().subscribe(
            (res) => {
                this.caseDocumentNatures = res.json();
                // console.log(this.caseDocumentNatures);
                this.dataSource = new MatTableDataSource<CaseDocumentNature>(this.caseDocumentNatures);
                this.dataSource.paginator = this.paginator;

                if (this.caseDocumentNatures.length == 0) {
                    msg.msg = 'No CaseDocumentNatures Found';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                }
                this.isSpinner = false;
            },
            (err) => {
                console.log(err);
                this.isSpinner = false;
                this._authService.errStatusCheck(err);
            }
        );
    }

    addField(field) {
        const dialogRef = this.dialog.open(AddCaseDocumentNatureField, {
            width: '450px',
            data: { field }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseDocumentNatureList();
        });
    }

    onEdit(value, caseDocumentNature) {
        // console.log('value', value, '---id', id);
        const dialogRef = this.dialog.open(EditCaseDocumentNatureField, {
            width: '450px',
            data: { value, caseDocumentNature }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseDocumentNatureList();
        });
    }

    onDelete(value, id, name) {
        const dialogRef = this.dialog.open(DeleteCaseDocumentNatureField, {
            width: '450px',
            data: { value, id, name }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseDocumentNatureList();
        });
    }
}


@Component({
    selector: 'add-caseDocumentNature',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class AddCaseDocumentNatureField {

    title = "Add New Case Document Nature";
    caseDocumentNature: CaseDocumentNature = new CaseDocumentNature();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<AddCaseDocumentNatureField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        // console.log('caseDocumentNature', this.caseDocumentNature);
        // console.log('data', this.fieldType);
        this.form = fb.group({
            'caseDocumentNature': [this.caseDocumentNature.documentNature, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseDocumentNatureDescription': [this.caseDocumentNature.documentNatureDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseDocumentNatureTooltip': [this.caseDocumentNature.documentNatureTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })

    }

    onCaseDocumentNatureFocusOut() {
        this.caseDocumentNature.documentNature = (this.caseDocumentNature.documentNature && this.caseDocumentNature.documentNature.length > 0 ? this.caseDocumentNature.documentNature.trim() : this.caseDocumentNature.documentNature);
    }

    onCaseDocumentNatureDescriptionFocusOut() {
        this.caseDocumentNature.documentNatureDescription = (this.caseDocumentNature.documentNatureDescription && this.caseDocumentNature.documentNatureDescription.length > 0 ? this.caseDocumentNature.documentNatureDescription.trim() : this.caseDocumentNature.documentNatureDescription);
    }

    onCaseDocumentNatureTooltipFocusOut() {
        this.caseDocumentNature.documentNatureTooltip = (this.caseDocumentNature.documentNatureTooltip && this.caseDocumentNature.documentNatureTooltip.length > 0 ? this.caseDocumentNature.documentNatureTooltip.trim() : this.caseDocumentNature.documentNatureTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.addCaseDocumentNature(this.caseDocumentNature).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully added an caseDocumentNature';
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



@Component({
    selector: 'edit-caseDocumentNature',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class EditCaseDocumentNatureField {

    title = "Edit Case Document Nature";
    caseDocumentNature: CaseDocumentNature = new CaseDocumentNature();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<EditCaseDocumentNatureField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.value;
        // console.log('data', data);

        if (this.fieldType === 'caseDocumentNature') {
            // this.caseDocumentNature.id = data.id;
            // this.caseDocumentNature.documentNatureId = data.id;
            // this.caseDocumentNature.documentNature = data.name;
            this.caseDocumentNature = data.caseDocumentNature;
        }
        // console.log('this.caseDocumentNature', this.caseDocumentNature);

        this.form = fb.group({
            'caseDocumentNature': [this.caseDocumentNature.documentNature, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseDocumentNatureDescription': [this.caseDocumentNature.documentNatureDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseDocumentNatureTooltip': [this.caseDocumentNature.documentNatureTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })
    }

    onCaseDocumentNatureFocusOut() {
        this.caseDocumentNature.documentNature = (this.caseDocumentNature.documentNature && this.caseDocumentNature.documentNature.length > 0 ? this.caseDocumentNature.documentNature.trim() : this.caseDocumentNature.documentNature);
    }

    onCaseDocumentNatureDescriptionFocusOut() {
        this.caseDocumentNature.documentNatureDescription = (this.caseDocumentNature.documentNatureDescription && this.caseDocumentNature.documentNatureDescription.length > 0 ? this.caseDocumentNature.documentNatureDescription.trim() : this.caseDocumentNature.documentNatureDescription);
    }

    onCaseDocumentNatureTooltipFocusOut() {
        this.caseDocumentNature.documentNatureTooltip = (this.caseDocumentNature.documentNatureTooltip && this.caseDocumentNature.documentNatureTooltip.length > 0 ? this.caseDocumentNature.documentNatureTooltip.trim() : this.caseDocumentNature.documentNatureTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.updateCaseDocumentNature(this.caseDocumentNature).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully updated an caseDocumentNature';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close(this.caseDocumentNature);
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}



@Component({
    selector: 'delete-caseDocumentNature',
    templateUrl: '../../../dialogs/admin.confirm.field.delete.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeleteCaseDocumentNatureField {
    fieldType: string;
    id: number;
    name: string;
    constructor(
        public dialogRef: MatDialogRef<DeleteCaseDocumentNatureField>,
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
        // console.log('data', this.fieldType);

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.deleteCaseDocumentNature(this.id).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully deleted an caseDocumentNature';
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




