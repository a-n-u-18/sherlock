import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    
    constructor(private http: HttpClient) {}
    getToken(){
        return localStorage.getItem('token');
    }
    login(email, pwd) {
        return this.http.post<any>(`${environment.apiUrl}/user/login`, { email, pwd })
        .pipe(map(user => {
            localStorage.setItem('token',user.token);
            return user;
        }));
    }
    
    logout() {
        localStorage.removeItem('token');
    }
}