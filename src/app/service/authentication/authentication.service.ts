import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {User} from "../../model/user";
import {Response} from "../../model/response";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = "http://localhost:8080/api/auth/";

  constructor(private http: HttpClient,
              private toast: ToastrService) {
  }

  login(user: User): Observable<Response> {
    return this.http.post<Response>(this.url + 'login', user);
  }

  register(user: User): Observable<Response> {
    return this.http.post<Response>(this.url + 'register', user);
  }

  profile(): Observable<User> {
    return this.http.get<User>(this.url + 'info');
  }

  isAuthenticate(): Observable<boolean> {
    let token = localStorage.getItem("access-token");
    let expiration = localStorage.getItem("token-expiration");

    if (token && expiration) {
      const expirationDate = new Date(expiration);
      const now = new Date();

      if (expirationDate >= now) {
        return of(true);
      }

      return this.profile()
        .pipe(
          map(() => true),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401 || error.status === 403) {
              localStorage.removeItem("access-token");
              localStorage.removeItem("token-expiration");
              localStorage.removeItem("refresh-token");
            }
            return throwError(() => new Error("No or Invalid token"));
          })
        );
    }
    this.toast.error("You are not authenticated", "Error")

    return of(false);
  }
}
