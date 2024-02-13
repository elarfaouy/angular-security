import {HttpInterceptorFn} from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const whitelistUrls = ['api/auth/login', 'api/auth/register'];
  let token = localStorage.getItem("access-token");

  console.log(token);

  if (!whitelistUrls.some(url => req.url.includes(url))) {
    req = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
    });
  }

  return next(req);
};
