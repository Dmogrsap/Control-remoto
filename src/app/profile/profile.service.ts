import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { User } from '../models/user.models';
import { DeviceInfo } from './InfoDevice'
import { from, Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
};

@Injectable()
export class ProfileService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('Datos');
    }

    getDevices() {
        return this.http.get<any>('/inte/user/' + localStorage.getItem("user_remo"), httpOptions)
        .pipe(
            catchError(this.handleError('get Data'))
        );
    }

    async newCommand(act: any) {
        return await this.http.post<any>('/inte/newCommand', act, httpOptions)
        .pipe(
            catchError(this.handleError('get Data'))
        ).toPromise();
    }

    sendCommand(info: any) {
        return this.http.post<any>('/inte/sendCommand', info, httpOptions)
        .pipe(
            catchError(this.handleError('Send data'))
        );
    }

    async newDevice(dev: any, type: string) {
        return this.http.post<any>('/inte/user/' + localStorage.getItem("user_remo") + "/newDevice/" + type, 
        dev,
        httpOptions)
        .pipe(
            catchError(this.handleError('get Data'))
        );
    }
}