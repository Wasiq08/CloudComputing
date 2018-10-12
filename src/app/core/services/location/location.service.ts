
import { HttpService } from '../base/http.service';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

    getUrl: string;
    constructor(private _http: HttpService) { }

    public getCountries(): Observable<any> {
        return this._http.get('country/all').map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getRegions(): Observable<any> {
        this.getUrl = 'regions/all';
        return this._http.get(`${this.getUrl}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getRegionsViaCountryId(countryId: any): Observable<any> {
        // this.getUrl = 'region';
        this.getUrl = 'region/via/country';
        return this._http.get(`${this.getUrl}/${countryId}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getStates(countryId: any): Observable<any> {
        this.getUrl = 'states/all';
        return this._http.get(`${this.getUrl}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getStatesViaCountryId(countryId: any): Observable<any> {
        this.getUrl = 'state/via/country';
        return this._http.get(`${this.getUrl}/${countryId}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getCities(): Observable<any> {
        this.getUrl = 'city/all';
        return this._http.get(`${this.getUrl}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getCitiesViaRegionId(id: any): Observable<any> {
        this.getUrl = 'city/via/region';
        // this.getUrl = 'city';
        return this._http.get(`${this.getUrl}/${id}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getCitiesViaStateId(id: any): Observable<any> {
        this.getUrl = 'city/via/state';
        // this.getUrl = 'city';
        return this._http.get(`${this.getUrl}/${id}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getBranches(): Observable<any> {
        this.getUrl = 'branches/all';
        return this._http.get(`${this.getUrl}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getBranchesViaCityId(id: any): Observable<any> {
        // this.getUrl = 'branch';
        this.getUrl = 'branch/via/city';
        return this._http.get(`${this.getUrl}/${id}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getZipCodes(countryId: number, zipCode: string): Observable<any> {
        this.getUrl = 'location';
        return this._http.get(`${this.getUrl}/${countryId}/${zipCode}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
