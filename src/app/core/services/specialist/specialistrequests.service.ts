import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import { AuthService} from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


import { environment } from "../../../../environments/environment";

@Injectable()
export class SpecialistRequestService
{
   

    constructor(private _http: HttpService,private _authServices: AuthService) {}

    getSpecialistRequest(): Observable<any> 
    {
        return this._http.get("specialist/requests/pending") .catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    setSpecialistRequest(id,action,result): Observable<any> 
    {
        let getUser=this._authServices.getUser(); 
        let body = {
            SpecialistRequestId: id,
            PerformedAction:action,
            PerformedBy:getUser.id,
            Comments:result
        }
        console.log("setSpecialistRequest"+ body.PerformedAction)
        return this._http.put("specialist/request/action",body) .catch((err, caught) => {
            return Observable.throw(err);
        });
    }

}
export class Requests
{
    id: any;
    specialityId: any;
    specialityName: any;
    facilityId: any;
    facilityName: any;
    status: any;
    pendingSince: any;
    isHighPriority:any;
    reasonForRequest:any;
    
}
export class Accepted
{
    id: any;
    host: any;
    token: any;
    resourceId: any;
    specialistRequestId: any;
}

