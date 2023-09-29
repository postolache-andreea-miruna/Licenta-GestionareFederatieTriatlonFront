import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostareCreateModel } from '../models/postareCreateModel';
import { PostareComentarii } from '../models/postareComentarii';
import { PostareByEmailUtilizModel } from '../models/postareByEmailUtilizModel';
import { PostareModelTotal } from '../models/postareModelTotal';

@Injectable({
  providedIn: 'root'
})
export class PostariService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Postare'

  constructor(
    public http: HttpClient,
  ) { }


  public GetPostariByEmail(email:string): Observable<PostareByEmailUtilizModel[]> {
    return this.http.get<PostareByEmailUtilizModel[]>(`${this.url}/postariUtilizator/${email}`,this.httpOptions);
  }

  public GetPostariVazuteDeUtilizEmail(email:string): Observable<PostareComentarii[]> {
    return this.http.get<PostareComentarii[]>(`${this.url}/byEmail/${email}`,this.httpOptions);
  }

  public GetAllPostari():Observable<PostareModelTotal[]> {
    return this.http.get<PostareModelTotal[]>(`${this.url}/postari`,this.httpOptions);
  }

  public deletePostare(id: Number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }
  
  public UpdateFericireCresc(model: number ): Observable<any>{
    return this.http.put(`${this.url}/fericireReactiiCresc`,model, this.httpOptions);
  }
  public UpdateFericireDesc(model: number ): Observable<any>{
  return this.http.put(`${this.url}/fericireReactiiDesc`,model, this.httpOptions);
  }

  public UpdateTristeteCresc(model: number ): Observable<any>{
    return this.http.put(`${this.url}/tristeteReactiiCresc`,model, this.httpOptions);
  }
  public UpdateTristeteDesc(model: number ): Observable<any>{
  return this.http.put(`${this.url}/tristeteReactiiDesc`,model, this.httpOptions);
  }

  public createPostare(model: PostareCreateModel ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }
}
