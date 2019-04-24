import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { catchError, map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(public http: Http,
    private processHttpmsgService: ProcessHttpmsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes').pipe(
      map(res => { return this.processHttpmsgService.extractData(res) })
    ).pipe(
      catchError(error => { return this.processHttpmsgService.handleError(error) })
    );
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id).pipe(
      map(res => { return this.processHttpmsgService.extractData(res) })
    ).pipe(
      catchError(error => { return this.processHttpmsgService.handleError(error) })
    );
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true').pipe(
      map(res => { return this.processHttpmsgService.extractData(res)[0] })
    ).pipe(
      catchError(error => { return this.processHttpmsgService.handleError(error) })
    );
  }
}
