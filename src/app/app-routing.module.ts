import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateViaAuthGuard } from './core/security/auth.guard';
import { CanActivateViaMainGuard } from './core/security/main.page.gurad';

// import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ResendVerificationComponent } from './auth/verfication/resend-verification.component';
import { VerificationComponent } from './auth/verfication/verification.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/forgot-password/reset-password.component';
import { WelcomeComponent } from './test/welcome.component';
import { NotFoundComponent } from './others/not-found.component';
import { PermissionDeniedComponent } from './others/permission.denied.component';
import { LogoutComponent } from './auth/logout/logout.component';

import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [CanActivateViaMainGuard],
    children: [],
  },
  {
    path: 'login',
    component: LoginComponent,
    children: []
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'verification',
    component: VerificationComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'resend-verification',
    component: ResendVerificationComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    // pathMatch: 'full',
    // component: HomeComponent,
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'case',
    loadChildren: './case/case.module#CaseModule',
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },
  {
    path: 'error',
    component: NotFoundComponent,
    // canActivate: [CanActivateViaAuthGuard],
    children: []
  },
  {
    path: 'permission',
    component: PermissionDeniedComponent,
    // canActivate: [CanActivateViaAuthGuard],
    children: []
  },
  {
    path: 'logout',
    component: LogoutComponent,
    children: []
  },
  { path: 'welcome', component: WelcomeComponent },
  // { path: 'welcome', redirectTo: '', pathMatch: 'full' },
  // { path: '', component: WelcomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
