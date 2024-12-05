import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpsService {
  constructor(private http: HttpClient) {}

  getRequest(url: string): Observable<any> {
    return this.http.get(`${environment?.baseAPIUrl}${url}`);
  }
  postRequest(url: string, data: Record<string, any>): Observable<any> {
    return this.http.post(`${environment?.baseAPIUrl}${url}`, data);
  }
}
