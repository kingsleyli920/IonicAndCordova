import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpmsgService {

  constructor(public http: Http) { }

  public extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json();
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message? error.message: error.toString();
    }
    console.log(errMsg);
    return throwError(errMsg);
  }
}
