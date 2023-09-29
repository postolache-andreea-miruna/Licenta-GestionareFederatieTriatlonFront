import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormularCreateModel } from '../models/formularCreateModel';
import { FormulareSportiviByIdModel } from '../models/formulareSportiviByIdModel';
import { LocatieModel } from '../models/locatieModel';
import { LocatieModelById } from '../models/locatieModelById';

@Injectable({
  providedIn: 'root'
})
export class LocatiiService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Locatie'

  constructor(
    public http: HttpClient,
  ) { }

  public GetLocatii(): Observable<LocatieModel[]> {
    return this.http.get<LocatieModel[]>(`${this.url}`,this.httpOptions);
  }

  public GetLocatieByIdComp(id:number): Observable<LocatieModelById[]> {
    return this.http.get<LocatieModelById[]>(`${this.url}/byIdComp/${id}`,this.httpOptions);
  }
  
  public GetLocatieById(id:number): Observable<LocatieModelById[]> {
    return this.http.get<LocatieModelById[]>(`${this.url}/byId/${id}`,this.httpOptions);
  }


  public deleteLocatie(id: Number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }

  public updateLocatie(model: LocatieModel ): Observable<any>{
  return this.http.put(`${this.url}`,model, this.httpOptions);
  }

  public createLocatie(model: LocatieModelById ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }
}
