import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CacheService } from '../services/cache.service';
import { Observable, of, tap } from 'rxjs';


//!!!! cache by urlWith params as a key
export const cacheInterceptor: HttpInterceptorFn = (req, next) :  Observable<HttpEvent<any>> => {
  const cacheService = inject(CacheService);
 
  
  //! cache only get methods
  if(req.method !== "GET")  return next(req);
  const cachedResponse = cacheService.getCachedData(req.urlWithParams);
  if (cachedResponse) {
    console.log(cachedResponse);
    
    // If cached, return cached response
    //! must return HttpResponse***
    return of(new HttpResponse(cachedResponse));
  } else {
    // Otherwise, let the request proceed and cache the response
    return next(req).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          cacheService.setCachedData(req.urlWithParams, response);
        }
      })
    );
  }
 
};
