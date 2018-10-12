import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA }    from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouterModule } from '@angular/router';

import { VerificationComponent } from './verification.component';
import { AuthService } from '../../core/services/auth/auth.service'
import { SharedModule } from "../../shared/shared.module";
import { UIService } from '../../core/services/ui/ui.service';

import { MatCardModule, MatProgressSpinnerModule, MatInputModule, MatFormFieldModule } from "@angular/material";

describe('verification test', () => {
    let comp: VerificationComponent;
    let fixture: ComponentFixture<VerificationComponent>;
    let de: DebugElement;
    let authService;

    let input;

    const mockAuth = {
        status: 200,
        verifyKey: (s: string) => true
    }
    const uiMock = {

    }

    beforeEach(() => { 
        TestBed.configureTestingModule({
            imports: [HttpModule, FormsModule,
                SharedModule, MatCardModule, 
                MatInputModule,
                MatFormFieldModule,
                MatProgressSpinnerModule],
            declarations: [ VerificationComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [ {provide: ComponentFixtureAutoDetect, userValue: true},
                 { provide: AuthService, useValue: mockAuth }, 
                 { provide: UIService, useValue: uiMock }, 
                 { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } } ],
        });

        fixture = TestBed.createComponent(VerificationComponent);
        comp = fixture.componentInstance;
        authService = fixture.debugElement.injector.get(AuthService);
        input  = fixture.debugElement.query(By.css('input'));
    });
    

    it('should be a valid form entry ', () => {
        comp.verificationCode = "11234";
        //comp.verify();

        fixture.detectChanges();

        expect(comp.disableButton).toBe(true);
    });
});