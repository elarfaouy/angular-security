import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../../model/response";

@Injectable({
  providedIn: 'root'
})
export class SecuredService {
  private url: string = "http://localhost:8080/api/secured";

  constructor(private http: HttpClient) {
  }

  securedUserWithGet(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }

  securedUserWithPost(): Observable<Response> {
    return this.http.post<Response>(this.url, null);
  }
}
