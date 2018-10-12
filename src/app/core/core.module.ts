import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LogService } from "./services/log/log.service";
import { AuthService } from "./services/auth/auth.service";
import { HttpService } from "./services/base/http.service";
import { RoutingInfoService } from "./services/routInfo/route.info.service";
import { UIService } from "./services/ui/ui.service";
import { WizardService } from './services/ui/wizard.service';
import { GeoLocationService } from "./services/location/geo-location.service";
import { LocationService } from "./services/location/location.service";

import { AdminSetupService } from "./services/admin/admin.setup.service";
import { AdminService } from "./services/admin/admin.service";
import { OrganizationService } from "./services/organization/organization.service";
import { CaseService } from "./services/case/case.service";
import { SpecialistService } from "./services/specialist/specialist.service"
import { SpecialistRequestService } from "./services/specialist/specialistrequests.service"
import { SpecialistScheduleService } from "./services/specialist/specialistschedule.service"
import { MessageService } from "./services/specialist/message.service"
import { PatientInfoService } from "./services/specialist/patientinfo.service"
import { CountBubble } from "./services/specialist/countbubble.service"

import { UserService } from '../core/services/user/user.service'
import { LoginGuard } from '../core/services/guard/login.guard';

@NgModule({
    imports: [HttpModule],
    providers: [{ provide: 'ILogService', useClass: LogService },
    { provide: 'IAuthService', useClass: AuthService },
        UIService, WizardService, HttpService, 
        RoutingInfoService, GeoLocationService, 
        LocationService, AdminSetupService, AdminService,
        OrganizationService, CaseService,
        SpecialistService,
        UserService, SpecialistRequestService, 
        SpecialistScheduleService, MessageService, CountBubble, PatientInfoService,
        LoginGuard],
    declarations: [],
    exports: []
})
export class CoreModule { }