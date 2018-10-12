import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import { AuthService} from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Accepted } from "./specialistrequests.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


import { environment } from "../../../../environments/environment";

@Injectable()
export class PatientInfoService
{
   

    constructor(private _http: HttpService,private _authServices: AuthService) {}

    public patientinfoshare = new BehaviorSubject<patientinfo>(null);

    sendpatientinfo(data: patientinfo) {
        this.patientinfoshare.next(data);
    }

    receivepatientinfo(): Observable<patientinfo> {
        return this.patientinfoshare.asObservable();
    }

    getpatientInfo(id): Observable<any> 
    {
        return this._http.get("specialist/request/"+id+"/patientinfo") .catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    getSpecialistRequestId() : number {
        var request = JSON.parse(localStorage.getItem('vidyo'));
        if(request && request.specialistRequestId)
            return request.specialistRequestId;
            
        return 0;
    }

    

    getpatientStoreInfo(): patientinfo {
        if (localStorage.getItem('patientinfo')) {
            return JSON.parse(localStorage.getItem('patientinfo'));
        }
        return;
    }

  
}
export class patientinfo
{
    id: any;
    createdBy: any;
    createdOn: any;
    updatedBy: any;
    updatedOn: any;
    isActive: any;
    firstName: any;
    lastName: any;
    lastWellKnownDate: any;
    mrn: any;
    requestingPhysicianCell: any;
    requestingPhysicianName: any;
    specialistRequestId: any;
    dob: any;
    gender: any;
}


