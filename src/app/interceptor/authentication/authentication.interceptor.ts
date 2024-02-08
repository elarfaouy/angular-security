import {HttpInterceptorFn} from '@angular/common/http';
import {throwError} from "rxjs";

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const whitelistUrls = ['api/auth/login', 'api/auth/register'];
  let token = localStorage.getItem("access-token");

  console.log(token);

  if (whitelistUrls.some(url => req.url.includes(url))) {
    if (isValidToken())
      return throwError(() => new Error("Already Logging"));

    return next(req);

  } else if (token && isValidToken()) {

    req = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
    });

    return next(req);

  } else {
    return throwError(() => new Error("No or invalid token"));
  }
};

const isValidToken = (): boolean => {
  let expiration = localStorage.getItem("token-expiration");

  if (expiration) {
    const expirationDate = new Date(expiration);
    const now = new Date();

    return expirationDate >= now;
  }

  return false;
}
