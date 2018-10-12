import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';

import { ViewProfileComponent } from './profile/view.profile.component';
import { ChangePasswordComponent } from './change.password/change.password.component';

import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        ViewProfileComponent,
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule, SharedModule,
        RouterModule.forChild([
            {
                path: 'view/profile/:id',
                component: ViewProfileComponent
            },
            {
                path: 'view-profile',
                component: ViewProfileComponent
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent
            }
        ])
    ],
    providers: [

    ]
})

export class UserModule { }