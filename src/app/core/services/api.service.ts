import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export const API_URL_TOKEN = new InjectionToken<string>('API_URL_TOKEN');

export interface IDefaultHttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export interface IApiResponse<T> {
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken: string;
  items: T[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(
    protected http: HttpClient,
    @Inject(API_URL_TOKEN) private apiUrl: string,
  ) {
  }

  public get<T>(url: string, options: IDefaultHttpOptions): Observable<IApiResponse<T>> {
    return this.http.get<IApiResponse<T>>(this.apiUrl + url, options);
  }
}
