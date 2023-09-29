import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IstoricCreateModel } from '../models/istoricCreateModel';
import { Observable } from 'rxjs';
import { IstoricSportivBestOfModel } from '../models/istoricSportivBestOfModel';
import { IstoricSportivModel } from '../models/istoricSportivModel';
import { IstoricRezultateCompetitieModel } from '../models/istoricRezultateCompetitieModel';
import { IerarhiePuncteModel } from '../models/ierarhiePuncteModel';
import { IstoricCluburiTopCompetitieModel } from '../models/istoricCluburiTopCompetitieModel';

@Injectable({
  providedIn: 'root'
})
export class IstoriceService { 
  httpOptions = {
  headers: new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
};
public url = 'https://localhost:7004/api/Istoric'

constructor(
  public http: HttpClient,
) { }

public createIstoric(model: IstoricCreateModel): Observable<any>{
  return this.http.post<any>(`${this.url}`,model,this.httpOptions);
}

public updateIstoric(model: IstoricCreateModel ): Observable<any>{
  return this.http.put(`${this.url}`,model, this.httpOptions);
}

public GetAllIstoriceCompId(codCompetitie:number): Observable<IstoricCreateModel[]> {
  return this.http.get<IstoricCreateModel[]>(`${this.url}/istoriceComp/${codCompetitie}`,this.httpOptions);
}


public GetBestofByIdSportiv(email:string): Observable<IstoricSportivBestOfModel[]> {
  return this.http.get<IstoricSportivBestOfModel[]>(`${this.url}/bestOf/${email}`,this.httpOptions);
}

public GetIstoriceByIdSportiv(email:string): Observable<IstoricSportivModel[]> {
  return this.http.get<IstoricSportivModel[]>(`${this.url}/istoric/${email}`,this.httpOptions);
}

public GetBestofByLegitimatieSportiv(nrLegitimatie:number): Observable<IstoricSportivBestOfModel[]> {
  return this.http.get<IstoricSportivBestOfModel[]>(`${this.url}/bestOfLegitimatie/${nrLegitimatie}`,this.httpOptions);
}

public GetIstoriceByLegitimatieSportiv(nrLegitimatie:number): Observable<IstoricSportivModel[]> {
  return this.http.get<IstoricSportivModel[]>(`${this.url}/istoricLegitimatie/${nrLegitimatie}`,this.httpOptions);
}

public GetRezultateCompetitieOrdonateDupaProba(id:number): Observable<IstoricRezultateCompetitieModel[]> {//doar declarat aici
  return this.http.get<IstoricRezultateCompetitieModel[]>(`${this.url}/rezultate/${id}`,this.httpOptions);
}

//FOLOSIT
public GetRezultateCompetitieFiltrareProba(id:number, numeProba:string, categorie:string, club:string): Observable<IstoricRezultateCompetitieModel[]> {
  return this.http.get<IstoricRezultateCompetitieModel[]>(`${this.url}/rezultateProba/${id}?numeProba=${numeProba}&categorie=${categorie}&club=${club}`,this.httpOptions);
}
//rezultateProba/2?numeProba=toate%20probele&categorie=toate%20categoriile&club=toate%20cluburile

// public getSportiviFilterForAntrenor(email:string,gen:string,anNastere:string): Observable<SportiviAntrenorModel[]> {// gen: string = "toate genurile", anNastere: any = "toti anii"
//   return this.http.get<SportiviAntrenorModel[]>(`${this.url}/sportiviAntrenorFilter/${email}?gen=${gen}&anNastere=${anNastere}`,this.httpOptions);
// }
public GetNumeProbeComp(id:number): Observable<string[]> {
  return this.http.get<string[]>(`${this.url}/numeProbeParticipante/${id}`,this.httpOptions);
}

public GetNumeComp(id:number): Observable<string[]> {
  return this.http.get<string[]>(`${this.url}/numeComp/${id}`,this.httpOptions);
}

public GetCategoriiComp(id:number): Observable<string[]> {
  return this.http.get<string[]>(`${this.url}/categoriiParticipante/${id}`,this.httpOptions);
}

public GetCluburiComp(id:number): Observable<string[]> {
  return this.http.get<string[]>(`${this.url}/cluburiParticipante/${id}`,this.httpOptions);
}

public GetIerarhie(categ:string,club:string, an:string, proba: string): Observable<IerarhiePuncteModel[]> {
  return this.http.get<IerarhiePuncteModel[]>(`${this.url}/ierarhie/?categ=${categ}&club=${club}&an=${an}&proba=${proba}`,this.httpOptions);
}
//////////
public GetTopCluburiCompId(id:number): Observable<IstoricCluburiTopCompetitieModel[]> {
  return this.http.get<IstoricCluburiTopCompetitieModel[]>(`${this.url}/topCluburi/${id}`,this.httpOptions);
}

public GetTopCluburi(an:string): Observable<IstoricCluburiTopCompetitieModel[]> {
  return this.http.get<IstoricCluburiTopCompetitieModel[]>(`${this.url}/cluburiTop/?an=${an}`,this.httpOptions);
}


public GetStatisticaMedaliiSpAntrComp(emailAntrenor:string,numeComp:string): Observable<number[]> {
  return this.http.get<number[]>(`${this.url}/antrenorStatistMedalii/${emailAntrenor}?numeComp=${numeComp}`,this.httpOptions);
}

public GetStatisticaPodiumSpAntrComp(emailAntrenor:string,numeComp:string): Observable<number[]> {
  return this.http.get<number[]>(`${this.url}/antrenorStatisticPodium/${emailAntrenor}?numeComp=${numeComp}`,this.httpOptions);
}



}
