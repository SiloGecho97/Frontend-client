import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, first } from "rxjs/operators";
import jwt_decode from "jwt-decode";
import { environment } from "@environments/environment";
import { ThrowStmt } from "@angular/compiler";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public userData;
  public token = JSON.parse(localStorage.getItem("token"));

  constructor(private http: HttpClient, private router: Router) {
    if (this.token) {
      let decodedToken = jwt_decode(this.token);
      this.currentUserSubject = new BehaviorSubject<any>({
        ...decodedToken,
        id: decodedToken.sub,
        token: this.token,
      });
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(
        JSON.parse(localStorage.getItem("token"))
      );
    }
    // console.log('loop')
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(value) {
    this.currentUserSubject.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem("token", JSON.stringify(value));
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        map(
          (data) => {
            // login successful if there's a jwt token in the response
            if (data.user.token) {
              this.userData = data.user;
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              this.setUserToken(data.user);
            }
            return data.user;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  setUserToken(user) {
    localStorage.setItem("token", JSON.stringify(user.token));
    this.currentUserSubject.next(user);
    // this.getUserByid.unsubscribe();
  }

  logout() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);
    localStorage.removeItem("token");
    this.router.navigate(["/auth/login"]);
  }
}
