import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProductlistComponent } from './product-list.component';
// import { ProductDetialComponent } from './product-detail.component';
// import { ProductNewComponent } from './product-new.component';
// import { ProductFilterPipe } from './product-filter.pipe';
// import { ProductDetailGuard } from './product-guard.service';
// import { ProductService } from './product.service';
// import { StarComponent } from '../shared/star.component';

import { MainHeader } from './header/main-header.component';
import { MainFooter } from './footer/main-footer.component';

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';


@NgModule({
    declarations: [
        MainHeader,
        MainFooter,
        MainComponent
        // ProductlistComponent,
        // ProductNewComponent,
        // ProductDetialComponent,
        // ProductFilterPipe
        // ,
        // StarComponent
    ],
    imports: [
        RouterModule,
        // FormsModule,
        CommonModule,
        // SharedModule,
        MaterialModule,

        // RouterModule.forChild([
        //     // {path: 'products', component: ProductlistComponent},
        //     // { path: 'product/:id'
        //     // , canActivate: [ ProductDetailGuard ]
        //     // , component: ProductDetialComponent},
        //     // {path: 'new/product', component: ProductNewComponent}

        //     {
        //         path: '', 
        //         component: MainComponent
        //     }

        //   ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ]
})

export class MainModule {}