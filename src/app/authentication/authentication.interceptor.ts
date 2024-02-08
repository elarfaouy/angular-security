import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const whitelistUrls = ['api/auth/login'];
    let token = localStorage.getItem("access-token");

    console.log(token);

    if (whitelistUrls.some(url => req.url.includes(url))) {
      return next.handle(req);

    } else if (token && this.isValidToken()) {

      req = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });

      return next.handle(req);

    } else {

      this.router.navigate(["login"]);
      return throwError(() => new Error("No or invalid token"));
    }
  }

  isValidToken(): boolean {
    let expiration = localStorage.getItem("token-expiration")?.toString();

    if (expiration){
      const expirationDate = new Date(expiration);
      const now = new Date();

      return expirationDate >= now;
    }

    return false;
  }
}
