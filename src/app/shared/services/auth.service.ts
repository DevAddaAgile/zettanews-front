import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { RegisterModal, AuthUserStateModel, AuthUserForgotModel, UpdatePasswordModel } from "../interface/auth.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  public redirectUrl: string | undefined;

  constructor(private http: HttpClient) {}

  // Register user
  register(userData: RegisterModal): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, userData);
  }

  // Login user
  login(credentials: AuthUserStateModel): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, credentials);
  }

  // Forgot password
  forgotPassword(emailData: AuthUserForgotModel): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/forgot-password`, emailData);
  }

  // Reset password
  resetPassword(resetData: UpdatePasswordModel): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/reset-password`, resetData);
  }
}
