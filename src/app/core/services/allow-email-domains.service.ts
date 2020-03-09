import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

import { Observable, Subject, of } from 'rxjs';
import { tap, map, take, switchMap } from 'rxjs/operators';


const EMAILDOMAINS_URL = '/api/allowEmailDomains';

@Injectable()
export class AllowEmailService {

  private _destroy$: Subject<void>;

  constructor(
    private readonly _http: HttpClient,
  ) {}

  public getDomains(): Observable<string[]> {
    return this._getDomains();
  }

  public asyncEmailDomainValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{[key: string]: any} | null> => {
      if (!control.value || control.invalid) {
        return of(null);
      }

      return this._getDomains()
        .pipe(
          map((emailDomains: string[]): number => {
            return emailDomains.findIndex((emailDomain: string) => {
              const emailContain = RegExp(`${emailDomain}$`);
              return emailContain.test(control.value);
            })              ;
          }),
          map((index: number) => index !== -1 ? null : {domainAvailable: true}),
        )
      }
    }     

  private _getDomains(): Observable<string[]> {
    return this._http
      .get<string[]>(EMAILDOMAINS_URL)
  }

}
