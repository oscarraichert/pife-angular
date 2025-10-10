import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../utils/api-routes';
import { LoginCredentials } from '../models/login-credentials';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private http: HttpClient,
    ) { }

    public login(credentials: LoginCredentials): Observable<string> {
        return this.http.post<string>(ApiRoutes.login, credentials);
    }

    public getToken(): string | null {
        return localStorage.getItem('jwt');
    }

    public setToken(jwtToken: string) {
        localStorage.setItem('jwt', jwtToken);
    }

    public logout() {
        localStorage.removeItem('jwt');
    }
}