import { Injectable } from '@angular/core';
import { Promotion } from '../../shared/promotion';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { catchError, map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(public http: Http,
    private processHttpmsgService: ProcessHttpmsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions').pipe(
      map(res => { return this.processHttpmsgService.extractData(res) })
    ).pipe(
      catchError(error => { return this.processHttpmsgService.handleError(error) })
    );
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id).pipe(
      map(res => { return this.processHttpmsgService.extractData(res) })
    ).pipe(
      catchError(error => { return this.processHttpmsgService.handleError(error) })
    );
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true').pipe(
      map(res => { return this.processHttpmsgService.extractData(res)[0] })
    ).pipe(
      catchError(error => { return this.processHttpmsgService.handleError(error) })
    );
  }
}
