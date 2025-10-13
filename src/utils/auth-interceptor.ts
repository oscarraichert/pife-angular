import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ApiRoutes } from './api-routes';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AppRoutes } from './app-routes';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();

  if (req.url.includes(ApiRoutes.login)) {
    return next(req);
  }

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      debugger
      if (error.status === 401) {
        auth.clearToken();      
        router.navigate([AppRoutes.login]); 
      }
      return throwError(() => error);
    })
  );
};
