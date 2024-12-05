import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { CommonService } from '@services/common.service';
import { GlobalService } from '@services/global.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private commonService: CommonService,
    private globalService: GlobalService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const AuthToken =
    //   this.commonService.getLoggedInUserDetails()?.['AuthToken'] || null;

    // if (AuthToken) {
    //   request = request.clone({
    //     setHeaders:
    //       request.body instanceof FormData
    //         ? { Token: AuthToken }
    //         : {
    //             Token: AuthToken,
    //             'Content-Type': 'application/json',
    //           },
    //   });
    // }
    this.commonService.setLoaderState(true);

    return next.handle(request).pipe(
      switchMap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want

          this.commonService.setLoaderState(false);
        }
        return of(event);
      }),
      catchError((error: HttpErrorResponse) => {
        this.commonService.setLoaderState(false);
        console.error('Error:', error);
        this.globalService.triggerToastMessage(
          'error',
          'Something went wrong!!!'
        );
        return throwError(() => error);
      })
    );
  }
}
