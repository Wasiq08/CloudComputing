import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth/auth.service'
import { StatusService } from '../../core/services/user/status.service'
import { SharedModule } from "../../shared/shared.module";
import { UIService } from '../../core/services/ui/ui.service'
import { Router, RouterModule }  from '@angular/router'; 

import { MatCardModule, MatProgressSpinnerModule } from "@angular/material";


describe('login test', () => {
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let de: DebugElement;
    let authService;

    let submitForm;

    const mockAuth = {
        logged: true
    }
    const uiMock = {

    }
    const statusMock = {

    }

    beforeEach(() => { 
        TestBed.configureTestingModule({
            imports: [HttpModule, ReactiveFormsModule, SharedModule, MatCardModule, MatProgressSpinnerModule],
            declarations: [ LoginComponent ],
            providers: [ {provide: ComponentFixtureAutoDetect, userValue: true},
                 { provide: AuthService, useValue: mockAuth }, 
                 { provide: UIService, useValue: uiMock },
                 { provide: StatusService, userValue: statusMock},
                 { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } } ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;
        authService = fixture.debugElement.injector.get(AuthService);
        submitForm  = fixture.debugElement.query(By.css('form'));
    });
    

    it('should be a valid form entry ', () => {
        comp.formLogin.controls["email"].setValue("valid@email.com");
        comp.formLogin.controls["password"].setValue("valid password");
        
        expect(comp.formLogin.invalid).toBe(false)
        expect(comp.disable).toBe(false)
    });

  
    it(' after successful response ', () => {
        fixture.detectChanges();
        expect(comp.disable).toBe(false);
    })
});