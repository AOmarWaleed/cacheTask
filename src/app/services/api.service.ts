import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface GeneralParams {
  [key: string]:
    | string
    | number
    | boolean
    | readonly (string | number | boolean)[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}


  
  fetchData<In, Out>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    params?: GeneralParams,
    body?: In
  ): Observable<Out> {
    return this.http.request<Out>(method, this.BASE_URL + endpoint, {
      body,
      params,
    });
  }
}
