import { Injectable, Inject } from '@angular/core';
import {
    Http,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Headers,
    Request
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { environment } from '../../../../environments/environment'
import { ILogService } from "../log/ilog.service";
import { IAuthService } from "../auth/iauth.service";
import { LogMessage, LogTypes } from "../../models/log.message";
import { AuthService } from '../auth/auth.service'
@Injectable()
export class HttpService {

    constructor(private _http: Http, private _authServices: AuthService,
        @Inject('ILogService') private _logService: ILogService,
        @Inject('IAuthService') private _authService: IAuthService) {
        // super(backend, defaultOptions);
    }

    /**
     * Performs any type of http request.
     * @param url
     * @param options
     * @returns {Observable<Response>}
     */
    public request(url: string, options?: RequestOptionsArgs): Observable<Response> {

        //build complete url
        //base + url
        url = this.getFullUrl(url);

        //setup options and header
        let newOptions = options ? options : new RequestOptions();
        this.setHeaders(newOptions.headers);

        return this._http.request(url, options)
            .catch(this.onCatch)
            .finally(this.onFinally);
    }

    /**
  * Performs a request with `get` http method.
  * @param url
  * @param options
  * @returns {Observable<>}
  */
    public get(url: string, options?: RequestOptionsArgs): Observable<any> {

        url = this.getFullUrl(url);
        let newOptions = options ? options : new RequestOptions();
        
        newOptions.headers = this.setHeaders(newOptions.headers);

        return this._http.get(url, newOptions)
            .catch(this.onCatch.bind(this))
            .finally(this.onFinally);
    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {


        url = this.getFullUrl(url);
        let newOptions = options ? options : new RequestOptions();
        newOptions.headers = this.setHeaders(newOptions.headers);
        return this._http.post(url, body, newOptions)
            .catch(this.onCatch)
            .finally(this.onFinally);
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {

        url = this.getFullUrl(url);
        let newOptions = options ? options : new RequestOptions();
        newOptions.headers = this.setHeaders(newOptions.headers);

        return this._http.put(url, body, newOptions)
            .catch(this.onCatch)
            .finally(this.onFinally);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<any> {

        url = this.getFullUrl(url);
        let newOptions = options ? options : new RequestOptions();
        this.setHeaders(newOptions.headers);

        return this._http.delete(url, options)
            .catch(this.onCatch)
            .finally(this.onFinally);
    }


    protected onFinally(): void {
        //ToDo: log final event
    }

    protected onDo(res: Response) {

        let msg: LogMessage = {
            LogType: LogTypes.Information,
            Message: "Successfully completed : " + res.url,
            Tag: 'Base Service,' + res.status
        };

        this._logService.log(msg);
    }

    protected onError(error: any) {
        let msg: LogMessage = {
            LogType: LogTypes.Error,
            Message: "Error in base service. Error :" + error,
            Tag: 'Bsee Service,error'
        }

        this._logService.log(msg);
    }

    protected onCatch(error: any, caught: Observable<any>): Observable<any> {

        // let msg: LogMessage = {
        //     LogType: LogTypes.Error,
        //     Message: "Error in base service. Error :" + error,
        //     Tag: 'Bsee Service,error'
        // }

        // this._logService.log(msg);
        console.log("https service" + error.status + "https service message" + error.statusText)
        if (error.status == 401) {
            console.log("error: 401")

            this._authServices.logoutUser();
        }

        return Observable.throw(error);
    }

    /**
    * Build API url.
    * @param url
    * @returns {string}
    */
    protected getFullUrl(url: string): string {
        return environment.apiBaseUrl + url;
    }

    /**
     * Set headers
     * @param headers
     * @returns {Headers}
     */
    public setHeaders(headers: Headers): Headers {

        let h = headers ? headers : new Headers();
        if (h.keys.length == 0)
            h.append('Content-Type', 'application/json');

        let token = this._authService.getToken();

        // if (token) {
        //     h.append('Authorization', "bearer " + token);
        // }
        //h.append('X-Spree-Token', this._authService.getToken());
        //console.log(this._authService.getToken());
        return h;
    }
}