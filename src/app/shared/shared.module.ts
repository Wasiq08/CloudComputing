import { NgModule } from '@angular/core';
import { NavComponent } from "./nav/nav.component";
import { SpinComponent } from "./spin/spin.component";
// import { BrowserModule } from "@angular/platform-browser";
import { ToastComponent } from "./toast/toast.component";
import { MsgBoxComponent } from "./msgbox/msgbox.component";
import { MsgDialog } from "./msgbox/msgdialog.component";
// import { MaterialModule } from ".././material/material.module";
import { MaterialModule } from "../material/material.module";
// import { MatIconModule } from "@angular/material/icon";
// import { MatProgressBarModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EqualValidator } from './directives/equal-validator.directive';
import { BlockCopyPasteDirective } from './directives/blockCopyPaste.directive';

import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderNotificationComponent } from './notification/header.notification.component';

import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { from } from 'rxjs/observable/from';

@NgModule({
    imports: [
        MaterialModule,
        // BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        // MatIconModule, 
        // MatProgressBarModule,
        CommonModule, RouterModule,
        CollapseModule.forRoot(), BsDropdownModule.forRoot()
    ],

    declarations: [EqualValidator,
        BlockCopyPasteDirective,
        NavComponent, SpinComponent,
        ToastComponent,
        MsgBoxComponent, MsgDialog,
        HeaderComponent, SidebarComponent,
        HeaderNotificationComponent, FooterComponent,

    ],

    exports: [
        // MaterialModule, 
        BlockCopyPasteDirective,
        NavComponent, SpinComponent,
        ToastComponent, MsgBoxComponent, CommonModule,
        MsgDialog, HeaderComponent, SidebarComponent,
        HeaderNotificationComponent, FooterComponent
    ],

    entryComponents: [MsgDialog]
})
export class SharedModule {
}