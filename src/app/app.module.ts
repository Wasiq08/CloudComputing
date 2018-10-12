import { APP_BASE_HREF } from '@angular/common';

import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
// import { MatIconModule } from "@angular/material/icon";
import { AppComponent } from './app.component';

// import { MainComponent } from './main/main.component';
// import { MainHeader } from './main/main-header/main-header.component';
import { MainModule } from './main/main.module';

import { WelcomeComponent } from './test/welcome.component';
import { UploadModule } from './upload-media/upload.module';

import { NotFoundComponent } from './others/not-found.component';
import { PermissionDeniedComponent } from './others/permission.denied.component';

import { CanActivateViaAuthGuard } from './core/security/auth.guard';
import { CanActivateViaMainGuard } from './core/security/main.page.gurad';

import { SharedModule } from './shared/shared.module';

// import { BlockCopyPasteDirective } from './shared/directives/blockCopyPaste.directive';



@NgModule({
  declarations: [
    AppComponent,

    // MainComponent,
    WelcomeComponent,
    NotFoundComponent,
    PermissionDeniedComponent,
    // BlockCopyPasteDirective,

  ],
  imports: [
    MainModule,
    AngularFontAwesomeModule,

    SharedModule,
    CoreModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    // MatIconModule,
    AppRoutingModule,
    UploadModule,
 
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/' + (environment.webAppUrl || '')
    },
    CanActivateViaAuthGuard,
    CanActivateViaMainGuard
  ],
  bootstrap: [AppComponent],
  

})
export class AppModule { }
