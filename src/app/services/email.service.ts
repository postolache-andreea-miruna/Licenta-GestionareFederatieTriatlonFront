import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateEmail } from '../models/dateEmail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Email'

  constructor(
    public http: HttpClient,
  ) { }


  public createEmail(model:DateEmail): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }
}
