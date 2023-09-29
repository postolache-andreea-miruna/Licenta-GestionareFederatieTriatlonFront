import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormularCreateModel } from '../models/formularCreateModel';
import { FormularByIdModel } from '../models/formularByIdModel';
import { FormulareSportiviByIdModel } from '../models/formulareSportiviByIdModel';
import { FormularModelTotal } from '../models/formularModelTotal';

@Injectable({
  providedIn: 'root'
})
export class FormulareService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Formular'

  constructor(
    public http: HttpClient,
  ) { }

  public GetFormInfo(id:number): Observable<FormularByIdModel> {
    return this.http.get<FormularByIdModel>(`${this.url}/form/${id}`,this.httpOptions);
  }

  public GetFormulareBySpEmail(email:string): Observable<FormulareSportiviByIdModel[]> {
    return this.http.get<FormulareSportiviByIdModel[]>(`${this.url}/formuribyEmail/${email}`,this.httpOptions);
  }

  public GetAllFormulare(an:string):Observable<FormularModelTotal[]>{
    return this.http.get<FormularModelTotal[]>(`${this.url}/formulare?an=${an}`,this.httpOptions);
  }

  public createFormular(model: FormularCreateModel ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }
}
