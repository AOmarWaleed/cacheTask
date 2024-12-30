import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private api: ApiService) {}
  getProperties(page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    console.log(start);

    return this.api.fetchData('GET', 'properties', {
      _start: start,
      _limit: pageSize,
    });
  }
  getProperty(id: number) {
    return this.api.fetchData('GET', 'properties', {
      id
    }).pipe(
      map((res : any) =>  res[0])
    )
  }
}
