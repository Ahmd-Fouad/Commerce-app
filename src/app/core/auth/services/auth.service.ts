import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  register(regObj: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/signup`, regObj)
  }

  login(logObj: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/signin`, logObj)
  }

  logOut(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login'])
  }

  resetPassMail(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/forgotPasswords`, data)
  }

  resetPassCode(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/verifyResetCode`, data)
  }

  resetPassNewPass(data: object): Observable<any> {
    return this.http.put(`${environment.baseUrl}auth/resetPassword`, data)
  }

}
