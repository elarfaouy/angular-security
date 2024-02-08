import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {Response} from "../../model/response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = "http://localhost:8080/api/auth/";

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<Response> {
    return this.http.post<Response>(this.url + 'login', user);
  }

  register(user: User): Observable<Response> {
    return this.http.post<Response>(this.url + 'register', user);
  }
}
