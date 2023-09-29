import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificareCreateModel } from '../models/notificareCreateModel';
import { NotificariAfisareModel } from '../models/notificariAfisareModel';
import { NotificareById } from '../models/notificareById';
import { NotificareCodMesajModel } from '../models/notificareCodMesajModel';

@Injectable({
  providedIn: 'root'
})
export class NotificariService {

  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Notificare'

  constructor(
    public http: HttpClient,
  ) { }

  public GetNotificariCodMesaj(): Observable<NotificareCodMesajModel[]> {
    return this.http.get<NotificareCodMesajModel[]>(`${this.url}/notificarile`,this.httpOptions);
  }

  public GetNotificariLogatUser(email:string): Observable<NotificariAfisareModel[]> {
    return this.http.get<NotificariAfisareModel[]>(`${this.url}/byEmail/${email}`,this.httpOptions);
  }

  public GetInfoNotifById(idNotif:number): Observable<NotificareById> {
    return this.http.get<NotificareById>(`${this.url}/byIdul/${idNotif}`,this.httpOptions);
  }
  
  public GetNrNotifNecitite(email:string): Observable<number> {
    return this.http.get<number>(`${this.url}/numarNotif/${email}`,this.httpOptions);
  }

  // public deleteRecenzie(id: Number): Observable<any>{
  //   return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  // }

  public updateNotificare(model: number): Observable<any>{
  return this.http.patch(`${this.url}/notificareCitita/${model}`, this.httpOptions);
  }

  public createNotificare(model: NotificareCreateModel ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }

  public deleteNotificare(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }
}
