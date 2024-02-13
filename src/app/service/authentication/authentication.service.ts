import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
import {User} from "../../model/user";
import {Response} from "../../model/response";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = "http://localhost:8080/api/auth/";
  private _user!: User;

  constructor(private http: HttpClient,
              private toast: ToastrService) {
  }

  set user(user: User) {
    this._user = user;
  }

  get user(): Observable<User> {
    if (!this._user) {
      let userObservable = this.profile();
      userObservable.subscribe(
        (user) => this.user = user
      );
      return userObservable;
    }

    return of(this._user);
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

  hasRightAuthority(role: string): Observable<boolean> {
    return this.user.pipe(
      map(user => user.role == role),
      tap((value) => {
          if (!value) {
            this.toast.error("You don't have the right authority", "Error");
          }
        }
      )
    );
  }
}
