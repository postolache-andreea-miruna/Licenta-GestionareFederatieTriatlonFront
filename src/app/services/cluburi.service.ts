import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CluburiModel } from '../models/cluburiModel';
import { GetIdClubModel } from '../models/getIdClubModel';
import { ClubModelTotal } from '../models/clubModelTotal';
import { ClubUpdateModel } from '../models/clubUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class CluburiService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }
  private url = 'https://localhost:7004/api/Club';
  constructor(
    public http: HttpClient,
  ) { }

  public getCluburi(): Observable<CluburiModel[]> {
    return this.http.get<CluburiModel[]>(`${this.url}`,this.httpOptions);
  }
  public getCluburiTotal(): Observable<ClubModelTotal[]> {
    return this.http.get<ClubModelTotal[]>(`${this.url}/cluburi`,this.httpOptions);
  }
  public getNumeCluburi(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/numeCluburi`,this.httpOptions);
  }

  public getClubInfo(id:Number): Observable<GetIdClubModel[]> {
    return this.http.get<GetIdClubModel[]>(`${this.url}/byId/${id}`,this.httpOptions);
  }

  public createClub(model: GetIdClubModel ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }
  public updateClub(model: ClubUpdateModel): Observable<any>{
    return this.http.put(`${this.url}`,model, this.httpOptions);
  }
}
