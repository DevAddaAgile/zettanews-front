import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../public/environments/environment";
import { RegisterModal } from "../interface/auth.interface";

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
}
