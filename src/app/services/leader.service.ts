import { Injectable } from '@angular/core';
import { Leader } from '../../shared/leader';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { catchError, map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(public http: Http,
    private processHttpmsgService: ProcessHttpmsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders').pipe(
      map(res => { return this.processHttpmsgService.extractData(res) })
    ).pipe(
      catchError(error => { return this.processHttpmsgService.handleError(error) })
    );
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseURL + 'leaders/' + id).pipe(
      map(res => { return this.processHttpmsgService.extractData(res) })
    ).pipe(
      catchError(error => { return this.processHttpmsgService.handleError(error) })
    );
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true').pipe(
      map(res => { return this.processHttpmsgService.extractData(res)[0] })
    ).pipe(
      catchError(error => { return this.processHttpmsgService.handleError(error) })
    );
  }
}
