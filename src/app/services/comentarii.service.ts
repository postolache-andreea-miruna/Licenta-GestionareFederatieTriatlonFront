import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentariuModelCreate } from '../models/comentariuModelCreate';
import { ComentariuUpdateModel } from '../models/comentariuUpdateModel';
import { ComentariiCodTextModel } from '../models/comentariiCodTextModel';

@Injectable({
  providedIn: 'root'
})
export class ComentariiService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Comentariu'

  constructor(
    public http: HttpClient,
  ) { }

  
  public GetComentariiTotal(): Observable<ComentariiCodTextModel[]> {
    return this.http.get<ComentariiCodTextModel[]>(`${this.url}/comentarii`,this.httpOptions);
  }

  public deleteComentariu(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }
  
  public UpdateComentariu(model: ComentariuUpdateModel ): Observable<any>{
  return this.http.put(`${this.url}`,model, this.httpOptions);
  }

  public createComentariu(model: ComentariuModelCreate ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }
}
