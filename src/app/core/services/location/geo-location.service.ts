import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { environment } from "../../../../environments/environment";

@Injectable()
export class GeoLocationService
{
    constructor(private _http: Http) {}

    private getFullUrl(url: string)
    {
        return environment.apiBaseUrl + url;
    }

    getCountries(): Observable<any>
    {
        let url = this.getFullUrl("country/all")
        return this._http.get(url) .catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    getStates(countryID: string): Observable<any>
    {
        let url = this.getFullUrl("state/"+countryID)
        return this._http.get(url) .catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    getCities(stateID: string)
    {
        let url = this.getFullUrl("city/"+stateID)
        return this._http.get(url) .catch((err, caught) => {
            return Observable.throw(err);
        });
    }

}