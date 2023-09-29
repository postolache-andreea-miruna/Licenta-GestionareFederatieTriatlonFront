import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitiiModel } from '../models/competitiiModel';
import { GetIdCompetitieModel } from '../models/getIdCompetitieModel';
import { CompetitiiNumeModel } from '../models/competitiiNumeModel';
import { CompetitieNumeIdModel } from '../models/competitieNumeIdModel';
import { CompetitieModelCreate } from '../models/competitieModelCreate';
import { CompetitiiTotalModel } from '../models/competitiiTotalModel';
import { CompetitieModelUpdate } from '../models/competitieModelUpdate';

@Injectable({
  providedIn: 'root'
})
export class CompetitiiService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }
  private url = 'https://localhost:7004/api/Competitie';
  constructor(
    public http: HttpClient,
  ) { }

  public getCompetitii(): Observable<CompetitiiModel[]> {
    return this.http.get<CompetitiiModel[]>(`${this.url}`,this.httpOptions);
  }

  public getCompetitiiTotal(): Observable<CompetitiiTotalModel[]> {
    return this.http.get<CompetitiiTotalModel[]>(`${this.url}/competitii`,this.httpOptions);
  }

  public getNumeCompetitieId(id:number): Observable<CompetitiiNumeModel> {
    return this.http.get<CompetitiiNumeModel>(`${this.url}/numeComp/${id}`,this.httpOptions);
  }

  public getCompetitiiNume(): Observable<CompetitiiNumeModel[]> {
    return this.http.get<CompetitiiNumeModel[]>(`${this.url}/numeCompetitii`,this.httpOptions);
  }
  public getCompetitiiNumeId(): Observable<CompetitieNumeIdModel[]> {
    return this.http.get<CompetitieNumeIdModel[]>(`${this.url}/numeIdCompetitii`,this.httpOptions);
  }
  public getCompetitieInfo(id:Number): Observable<GetIdCompetitieModel[]> {
    return this.http.get<GetIdCompetitieModel[]>(`${this.url}/byId/${id}`,this.httpOptions);
  }

  public getCompetitiiSportiv(email:string): Observable<CompetitiiModel[]> {
    return this.http.get<CompetitiiModel[]>(`${this.url}/byEmailSportiv/${email}`,this.httpOptions);
  }

  public createCompetitie(model: CompetitieModelCreate ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  } 
   
  public updateCompetitie(model: CompetitieModelUpdate): Observable<any>{
    return this.http.put(`${this.url}`,model, this.httpOptions);
  }
  
}
