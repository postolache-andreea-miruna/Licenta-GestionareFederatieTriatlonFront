import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProbaModel } from '../models/probaModel';
import { ProbaModelTotal } from '../models/probaModelTotal';
import { ProbaCreateModel } from '../models/probaCreateModel';
import { ProbaUpdateModel } from '../models/probaUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class ProbeService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }
  private url = 'https://localhost:7004/api/Proba';
  constructor(
    public http: HttpClient,
  ) { }

  public getProbe(): Observable<ProbaModel[]> {
    return this.http.get<ProbaModel[]>(`${this.url}`,this.httpOptions);
  }

  public getProbeTotal(): Observable<ProbaModelTotal[]> {
    return this.http.get<ProbaModelTotal[]>(`${this.url}/probe`,this.httpOptions);
  }

  public createProba(model: ProbaCreateModel): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }
  public updateProba(model: ProbaUpdateModel): Observable<any>{
    return this.http.put(`${this.url}`,model, this.httpOptions);
  }
}
