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
        return this.http.post<any>('/inte/user/' + 
        localStorage.getItem("user_remo") +
        "/newDevice/" + type, 
        dev,
        httpOptions)
        .pipe(
            catchError(this.handleError('get Data'))
        );
    }

    ScheduleCommand(info: any) {
        return this.http.post<any>('/inte/progOn', info, httpOptions)
        .pipe(
            catchError(this.handleError('Prog On'))
        );
    }

    FavCommand(fav: any) {
        return this.http.post<any>('/inte/favorite', fav, httpOptions)
        .pipe(
            catchError(this.handleError('Fav'))
        );
    }

    NewFavCommand(fav: number) {
        return this.http.put<any>('inte/user/'+
        localStorage.getItem("user_remo") +
        '/newFavorite/' + fav, httpOptions)
        .pipe(
            catchError(this.handleError('Fav'))
        );
    }

    RemoveFav(fav: number[]) {
        return this.http.post<any>('inte/user/'+
        localStorage.getItem("user_remo") +
        '/removeFavorite/', fav, httpOptions)
        .pipe(
            catchError(this.handleError('Fav'))
        );
    }
}