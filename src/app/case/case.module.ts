import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';

// import { UserListComponent } from './users/user.list.component';
import { CaseCreateComponent } from './case.create/case.create.component';
// import { UserFilterPipe } from '../pipes/user-filter.pipe';

import { CommonModule } from "@angular/common";
import { MatNativeDateModule } from '@angular/material';


@NgModule({
    declarations: [
        // UserListComponent,
        CaseCreateComponent,
        // UserFilterPipe
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule,
        MatNativeDateModule,
        RouterModule.forChild([
            {
                path: 'create',
                component: CaseCreateComponent
            },
            {
                path: 'list',
                // component: AdminHomeComponent
            },
            { path: '**', redirectTo: '/', pathMatch: 'full' }
        ])
    ],
    entryComponents: [
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ]
})

export class CaseModule { }