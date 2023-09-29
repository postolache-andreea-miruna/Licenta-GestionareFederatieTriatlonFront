import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipModelCodNume } from '../models/tipModelCodNume';
import { TipModelById } from '../models/tipModelById';
import { TipModelTotal } from '../models/tipModelTotal';
import { TipUpdateModel } from '../models/tipUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class TipuriService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Tip'

  constructor(
    public http: HttpClient,
  ) { }
  public GetTipuriIdNume(): Observable<TipModelCodNume[]> {
    return this.http.get<TipModelCodNume[]>(`${this.url}/tipuri`,this.httpOptions);
  }

  public GetTipuriTotal(): Observable<TipModelTotal[]> {
    return this.http.get<TipModelTotal[]>(`${this.url}/tipuriTotal`,this.httpOptions);
  }

  public createTip(model: TipModelById ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }

  public updateTip(model: TipUpdateModel): Observable<any>{
    return this.http.put(`${this.url}`,model, this.httpOptions);
  }

}
