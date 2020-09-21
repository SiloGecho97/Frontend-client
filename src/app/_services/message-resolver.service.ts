import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageResolverService {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let page = parseInt(route.queryParamMap.get("page")) - 1 || 0;
    let pageSize = route.queryParamMap.get("pageSize") || 10;
    let message = route.queryParamMap.get("message") || "";
    let phoneNumber = route.queryParamMap.get("phoneNumber") || "";
    let date = route.queryParamMap.get("date") || "";

    // console.log({ page, pageSize, message, phoneNumber, date });

    return this.userService
      .getUserMessages({ page, pageSize, message, phoneNumber, date })
      .pipe(
        mergeMap((response) => {
          // console.log(response);
          if (response) {
            return of(response);
          } else {
            return EMPTY;
          }
        })
      );
  }
}
