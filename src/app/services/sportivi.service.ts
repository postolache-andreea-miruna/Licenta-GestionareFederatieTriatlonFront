import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SportiviAntrenorModel } from '../models/sportiviAntrenorModel';
import { SportiviByIdModel } from '../models/sportiviByIdModel';
import { SportivInfoModel } from '../models/sportivInfoModel';
import { SportivUpdateModel } from '../models/sportivUpdateModel';
import { GenSportiv } from '../models/genSportiv';
import { SportivDetEmail } from '../models/sportivDetEmail';

@Injectable({
  providedIn: 'root'
})
export class SportiviService{
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Sportiv'

  constructor(
    public http: HttpClient,
  ) { }

  public getSportiviForAntrenor(email:string): Observable<SportiviAntrenorModel[]> {
    return this.http.get<SportiviAntrenorModel[]>(`${this.url}/sportiviAntrenor/${email}`,this.httpOptions);
  }
  public getSportiviFilterForAntrenor(email:string,gen:string,anNastere:string): Observable<SportiviAntrenorModel[]> {// gen: string = "toate genurile", anNastere: any = "toti anii"
    return this.http.get<SportiviAntrenorModel[]>(`${this.url}/sportiviAntrenorFilter/${email}?gen=${gen}&anNastere=${anNastere}`,this.httpOptions);
  }

  public getSportivByEmail(email:string): Observable<SportiviByIdModel> {
    return this.http.get<SportiviByIdModel>(`${this.url}/byEmailView/${email}`,this.httpOptions);
  }
  public getVarstaSportiv(legitimatie:number): Observable<number> {
    return this.http.get<number>(`${this.url}/varstaSp/${legitimatie}`,this.httpOptions);
  }

  public getGenSportiv(legitimatie:number): Observable<GenSportiv> {
    return this.http.get<GenSportiv>(`${this.url}/gen/${legitimatie}`,this.httpOptions);
  }

  public getSportivDetaliiEmail(legitimatie:number): Observable<SportivDetEmail> {
    return this.http.get<SportivDetEmail>(`${this.url}/emailDetSportiv/${legitimatie}`,this.httpOptions);
  }


  public getSportivInfo(email:string): Observable<SportivInfoModel> {
    return this.http.get<SportivInfoModel>(`${this.url}/byEmail/${email}`,this.httpOptions);
  }

  public getSportiviClub(id:number): Observable<SportiviAntrenorModel[]> {
    return this.http.get<SportiviAntrenorModel[]>(`${this.url}/sportiviClub/${id}`,this.httpOptions);
  }
  public getSportiviClubSearch(id:number,numeFam:string,prenume:string): Observable<SportiviAntrenorModel[]> {
    return this.http.get<SportiviAntrenorModel[]>(`${this.url}/sportiviClubSearch/${id}?numeFam=${numeFam}&prenume=${prenume}`,this.httpOptions);
  }
  public updateSportiv(model: SportivUpdateModel): Observable<any>{
    return this.http.put(`${this.url}`,model, this.httpOptions);
  }
  
}
