import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tokeninfo } from './user'

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
};

@Injectable()
export class UserService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('Registro');
    }

    async addUser(user: tokeninfo) {

        return await this.http.post<any>("/inte/login", user, httpOptions )
        .pipe(
            catchError(this.handleError('login', user))
        ).toPromise();

    }

    async verUser(user: tokeninfo) {

        return await this.http.post<any>("/inte/sigin", user, httpOptions )
        .pipe(
            catchError(this.handleError('login', user))
        ).toPromise();

    }
}