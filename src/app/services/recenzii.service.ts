import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecenziiSportiviModel } from '../models/recenziiSportiviModel';
import { RecenzieUpdateModel } from '../models/recenzieUpdateModel';
import { RecenzieCreateModel } from '../models/recenzieCreateModel';
import { RecenziiSportivModel } from '../models/recenziiSportivModel';
import { RecenzieCodTextModel } from '../models/recenzieCodTextModel';

@Injectable({
  providedIn: 'root'
})
export class RecenziiService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Recenzie'

  constructor(
    public http: HttpClient,
  ) { }

  public GetRecenziiTotal(): Observable<RecenzieCodTextModel[]> {
    return this.http.get<RecenzieCodTextModel[]>(`${this.url}/recenziiTotal`,this.httpOptions);
  }

  public GetCompetitieSteleMedie(id:number): Observable<number> {
    return this.http.get<number>(`${this.url}/SteleCompetitie/${id}`,this.httpOptions);
  }
  

  public RecenzieDataDejaSpComp(email:string, id:number): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/RecenzieSpComp/${email}/${id}`,this.httpOptions);
  }
  

  public RecenziiSportiviCompId(id:number): Observable<RecenziiSportiviModel[]> {
    return this.http.get<RecenziiSportiviModel[]>(`${this.url}/RecenziiCompetitie/${id}`,this.httpOptions);
  }

  public RecenziileSportiv(email:string): Observable<RecenziiSportivModel[]> {
    return this.http.get<RecenziiSportivModel[]>(`${this.url}/RecenziiSp/${email}`,this.httpOptions);
  }


  public deleteRecenzie(id: Number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }

  public updateRecenzie(model: RecenzieUpdateModel ): Observable<any>{
  return this.http.put(`${this.url}`,model, this.httpOptions);
  }

  public createRecenzie(model: RecenzieCreateModel ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }
}
