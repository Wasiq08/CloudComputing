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
import { CaseDocument } from '../../../core/models/caseDocument';
// import { UtilityService } from '../../../core/services/general/utility.service';
import { User } from '../../../core/models/user';

import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'caseDocument-list',
    templateUrl: 'case.document.component.html',
    styleUrls: ['../setup.forms.css', '../../admin.component.css']
})
export class CaseDocumentComponent implements OnInit {

    isLogin: any;
    // getURL: string;
    // admins = new Array<any>();
    // caseDocument: CaseDocument = new CaseDocument();
    caseDocuments: CaseDocument[] = [];
    addStatus = true;
    updateStatus = true;
    deleteStatus = true;
    user: User = new User();

    displayedColumns = ['caseDocument', 'action'];
    dataSource = new MatTableDataSource<CaseDocument>(this.caseDocuments);
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
        this.loadCaseDocumentList();
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
        this.loadCaseDocumentList();
    }

    loadCaseDocumentList() {
        this.isSpinner = true;
        const msg = new Message();
        this._setupService.getCaseDocuments().subscribe(
            (res) => {
                this.caseDocuments = res.json();
                // console.log(this.caseDocuments);
                this.dataSource = new MatTableDataSource<CaseDocument>(this.caseDocuments);
                this.dataSource.paginator = this.paginator;

                if (this.caseDocuments.length == 0) {
                    msg.msg = 'No CaseDocuments Found';
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
        const dialogRef = this.dialog.open(AddCaseDocumentField, {
            width: '450px',
            data: { field }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseDocumentList();
        });
    }

    onEdit(value, caseDocument) {
        // console.log('value', value, '---id', id);
        const dialogRef = this.dialog.open(EditCaseDocumentField, {
            width: '450px',
            data: { value, caseDocument }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseDocumentList();
        });
    }

    onDelete(value, id, name) {
        const dialogRef = this.dialog.open(DeleteCaseDocumentField, {
            width: '450px',
            data: { value, id, name }
        });
        // console.log('value', value, '---id', id);
        dialogRef.afterClosed().subscribe(result => {
            this.filter = "";
            this.dataSource.filter = null;
            this.loadCaseDocumentList();
        });
    }
}


@Component({
    selector: 'add-caseDocument',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class AddCaseDocumentField {

    title = "Add New Case Document";
    caseDocument: CaseDocument = new CaseDocument();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<AddCaseDocumentField>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        // private _router: Router, 
        private _setupService: AdminSetupService,
        private fb: FormBuilder
    ) {
        this.fieldType = data.field;
        // console.log('caseDocument', this.caseDocument);
        // console.log('data', this.fieldType);
        this.form = fb.group({
            'caseDocument': [this.caseDocument.documentName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseDocumentDescription': [this.caseDocument.documentDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseDocumentTooltip': [this.caseDocument.documentTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })

    }

    onCaseDocumentFocusOut() {
        this.caseDocument.documentName = (this.caseDocument.documentName && this.caseDocument.documentName.length > 0 ? this.caseDocument.documentName.trim() : this.caseDocument.documentName);
    }

    onCaseDocumentDescriptionFocusOut() {
        this.caseDocument.documentDescription = (this.caseDocument.documentDescription && this.caseDocument.documentDescription.length > 0 ? this.caseDocument.documentDescription.trim() : this.caseDocument.documentDescription);
    }

    onCaseDocumentTooltipFocusOut() {
        this.caseDocument.documentTooltip = (this.caseDocument.documentTooltip && this.caseDocument.documentTooltip.length > 0 ? this.caseDocument.documentTooltip.trim() : this.caseDocument.documentTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.addCaseDocument(this.caseDocument).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully added an caseDocument';
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
    selector: 'edit-caseDocument',
    templateUrl: '../../../dialogs/admin.add.field.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class EditCaseDocumentField {

    title = "Edit Case Document";
    caseDocument: CaseDocument = new CaseDocument();
    fieldType: string;
    form: FormGroup;
    patternName = /^[A-Za-z ]+$/;

    constructor(
        public dialogRef: MatDialogRef<EditCaseDocumentField>,
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

        if (this.fieldType === 'caseDocument') {
            // this.caseDocument.id = data.id;
            // this.caseDocument.documentId = data.id;
            // this.caseDocument.documentName = data.name;
            this.caseDocument = data.caseDocument;
            
        }
        // console.log('this.caseDocument', this.caseDocument);

        this.form = fb.group({
            'caseDocument': [this.caseDocument.documentName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'caseDocumentDescription': [this.caseDocument.documentDescription, Validators.compose([Validators.pattern(this.patternName)])],
            'caseDocumentTooltip': [this.caseDocument.documentTooltip, Validators.compose([Validators.pattern(this.patternName)])],
        })
    }

    onCaseDocumentFocusOut() {
        this.caseDocument.documentName = (this.caseDocument.documentName && this.caseDocument.documentName.length > 0 ? this.caseDocument.documentName.trim() : this.caseDocument.documentName);
    }

    onCaseDocumentDescriptionFocusOut() {
        this.caseDocument.documentDescription = (this.caseDocument.documentDescription && this.caseDocument.documentDescription.length > 0 ? this.caseDocument.documentDescription.trim() : this.caseDocument.documentDescription);
    }

    onCaseDocumentTooltipFocusOut() {
        this.caseDocument.documentTooltip = (this.caseDocument.documentTooltip && this.caseDocument.documentTooltip.length > 0 ? this.caseDocument.documentTooltip.trim() : this.caseDocument.documentTooltip);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(field) {
        const msg = new Message();
        this._setupService.updateCaseDocument(this.caseDocument).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully updated an caseDocument';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close(this.caseDocument);
            },
            (err) => {
                console.log(err);
                this._authService.errStatusCheck(err);
            });
    }

}



@Component({
    selector: 'delete-caseDocument',
    templateUrl: '../../../dialogs/admin.confirm.field.delete.dialog.html',
    // styleUrls: ['../../campaign.component.css']
})

export class DeleteCaseDocumentField {
    fieldType: string;
    id: number;
    name: string;
    constructor(
        public dialogRef: MatDialogRef<DeleteCaseDocumentField>,
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
        this._setupService.deleteCaseDocument(this.id).subscribe(
            (res) => {
                msg.msg = res.json() ? res.json() : 'You have successfully deleted an caseDocument';
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




