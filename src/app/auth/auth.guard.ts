import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/_services/authentication.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private route: Router,) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      var decodedToken = jwt_decode(currentUser.token);
      if (decodedToken.exp * 1000 > Date.now()) {
        if (this.authenticationService.currentUserValue.role == "USER" ) {
          this.route.navigate([`/${this.authenticationService.currentUserValue.role.toLowerCase()}`]);
          return false;
        }
        return true;
      }

    }
    return true;

  }

}
