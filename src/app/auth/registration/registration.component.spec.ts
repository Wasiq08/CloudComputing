import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration.component';
import { AuthService } from '../../core/services/auth/auth.service'
import { SharedModule } from "../../shared/shared.module";
import { UIService } from '../../core/services/ui/ui.service';

import { MatCardModule, MatProgressSpinnerModule } from "@angular/material";

import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

describe('registration test', () => {
    let comp: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let de: DebugElement;
    let authService;

    let submitForm;

    const mockAuth = {
        logged: true
    }
    const uiMock = {

    }

    beforeEach(() => { 
        TestBed.configureTestingModule({
            imports: [PasswordStrengthBarModule, HttpModule, ReactiveFormsModule, SharedModule, MatCardModule, MatProgressSpinnerModule],
            declarations: [ RegistrationComponent],
            providers: [ {provide: ComponentFixtureAutoDetect, userValue: true},
                 { provide: AuthService, useValue: mockAuth }, 
                 { provide: UIService, useValue: uiMock }, 
                 { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } } ],
        });

        fixture = TestBed.createComponent(RegistrationComponent);
        comp = fixture.componentInstance;
        authService = fixture.debugElement.injector.get(AuthService);
        submitForm  = fixture.debugElement.query(By.css('form'));
    });
    

    it('should be a valid form entry ', () => {
        comp.form.controls["email"].setValue("valid@email.com");
        comp.form.controls["firstName"].setValue("valid firstname");
        comp.form.controls["lastName"].setValue("valid lastname");
        comp.form.controls["title"].setValue("valid title");
        comp.form.controls["credentials"].setValue("valid credentials");
        comp.form.controls["mobileNumber"].setValue(1233456);
        comp.form.controls["password"].setValue("Val1dP@ssword");
        comp.form.controls["confirmPassword"].setValue("Val1dP@ssword");

        expect(comp.form.invalid).toBe(false)
        expect(comp.disable).toBe(false)
    });

    it('password not match with confirm password will invalid form', () => {
        comp.form.controls["password"].setValue("Val1dP@ssword");
        comp.form.controls["confirmPassword"].setValue("no match password");
        expect(comp.form.invalid).toBe(true);
    });
});