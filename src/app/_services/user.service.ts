import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserMessages(params) {
    let urlParams = this.generateParams(params);
    return this.http.get(`${environment.apiUrl}/messages?${urlParams}`);
  }

  generateParams(params) {
    let url = "";
    let keys = Object.keys(params);
    keys.map((key) => {
      if (params[key] || key == "page") {
        url = url + `${key}=${params[key]}&`;
      }
    });

    return url.slice(0, url.length - 1);
  }
}
