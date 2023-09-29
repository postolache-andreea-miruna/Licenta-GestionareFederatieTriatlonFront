import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AntrenorByIdModel } from '../models/antrenorByIdModel';
import { PozaProfil } from '../models/pozaProfil';
import { AntrenorByIdViewModel } from '../models/antrenorByIdViewModel';
import { AntrenoriClubModel } from '../models/antrenoriClubModel';
import { AntrenorUpdateModel } from '../models/antrenorUpdateModel';
import { DetaliiTrimitereEmail } from '../models/detaliiTrimitereEmail';

@Injectable({
  providedIn: 'root'
})
export class AntrenoriService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Antrenor'
  public url1 = 'https://localhost:7004/api/Utilizator'

  constructor(
    public http: HttpClient,
  ) { }

  public getAntrenorInfo(email:string): Observable<AntrenorByIdModel> {
    return this.http.get<AntrenorByIdModel>(`${this.url}/byEmail/${email}`,this.httpOptions);
  }//doar antrenorul

  public getAntrenorView(email:string): Observable<AntrenorByIdViewModel> {
    return this.http.get<AntrenorByIdViewModel>(`${this.url}/byEmailViewSportiv/${email}`,this.httpOptions);
  }//doar ceilalti care ii vad profilul

  public getNrSportivi(email:string): Observable<number> {
    return this.http.get<number>(`${this.url}/nrSportivi/${email}`,this.httpOptions);
  }
//////
  public getDetaliiEmailAntrenor(): Observable<DetaliiTrimitereEmail[]> {
    return this.http.get<DetaliiTrimitereEmail[]>(`${this.url1}/antrenori`,this.httpOptions);
  }

  public getUrlUtilizator(email:string): Observable<PozaProfil> {
    return this.http.get<PozaProfil>(`${this.url1}/pozaByEmail/${email}`,this.httpOptions);
  }
  public getAbonareUtilizator(email:string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url1}/abonareStiri/${email}`,this.httpOptions);
  }


  public getAntrenoriClub(id:number): Observable<AntrenoriClubModel[]> {
    return this.http.get<AntrenoriClubModel[]>(`${this.url}/byIdClub/${id}`,this.httpOptions);
  }

  public getAntrenoriClubSearch(id:number,numeFam:string,prenume:string): Observable<AntrenoriClubModel[]> {
    return this.http.get<AntrenoriClubModel[]>(`${this.url}/byIdClubSearch/${id}?numeFam=${numeFam}&prenume=${prenume}`,this.httpOptions);
  }
  public updateAntrenor(model: AntrenorUpdateModel): Observable<any>{
    return this.http.put(`${this.url}`,model, this.httpOptions);
  }
}
