import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReactiePostareCreateModel } from '../models/reactiePostareCreateModel';
import { ReactiePostareUpdateFericireModel } from '../models/reactiePostareUpdateFericireModel';
import { ReactiePostareUpdateTristeteModel } from '../models/reactiePostareUpdateTristeteModel';
import { ReactiiModel } from '../models/reactiiModel';

@Injectable({
  providedIn: 'root'
})
export class ReactiipostareService {

  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/ReactiePostare'

  constructor(
    public http: HttpClient,
  ) { }


  public createReactiePostare(model: ReactiePostareCreateModel ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }

  public UpdateFericire(model: ReactiePostareUpdateFericireModel ): Observable<any>{
    return this.http.put(`${this.url}/fericire`,model, this.httpOptions);
  }
  
  public UpdateTristete(model: ReactiePostareUpdateTristeteModel ): Observable<any>{
      return this.http.put(`${this.url}/tristete`,model, this.httpOptions);
  }

  public GetReactiiForUserPostare(emailUtilizator:string,codPostare:number): Observable<ReactiiModel> {
    return this.http.get<ReactiiModel>(`${this.url}/reactii/${codPostare}/${emailUtilizator}`,this.httpOptions);
  }


  public GetNrReactiiFericire(codPostare:number): Observable<number> {
    return this.http.get<number>(`${this.url}/nrFericire/${codPostare}`,this.httpOptions);
  }

  public GetNrReactiiTristete(codPostare:number): Observable<number> {
    return this.http.get<number>(`${this.url}/nrTristete/${codPostare}`,this.httpOptions);
  }

}
