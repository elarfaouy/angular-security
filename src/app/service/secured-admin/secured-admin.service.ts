import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../../model/response";

@Injectable({
  providedIn: 'root'
})
export class SecuredAdminService {
  private url: string = "http://localhost:8080/api/admin/secured";

  constructor(private http: HttpClient) {
  }

  securedAdminWithGet(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }

  securedAdminWithPost(): Observable<Response> {
    return this.http.post<Response>(this.url, null);
  }
}
