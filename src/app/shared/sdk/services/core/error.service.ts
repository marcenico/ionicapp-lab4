/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
//import { Observable, throwError } from 'rxjs';
import { Observable} from 'rxjs';
import {_throw} from 'rxjs/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
/**
 * Default error handler
 */
@Injectable()
export class ErrorHandler {
  public handleError(errorResponse: HttpErrorResponse): ErrorObservable{//Observable<never> {
   // return throwError(errorResponse.error.error || 'Server error');
   return _throw(errorResponse.error.error || 'Server error');
  }
}
