import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "@app/_services/authentication.service";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: "root",
})
export class UserGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      var decodedToken = jwt_decode(currentUser.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      else {
        return true;
      }
    }
    this.router.navigate(["/auth/login"]);
    return false;
  }
}

