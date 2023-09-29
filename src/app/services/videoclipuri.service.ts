import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { videoModelCreate } from '../models/videoModelCreate';
import { VideoModelUpdate } from '../models/videoModelUpdate';
import { VideoModel } from '../models/videoModel';
import { CodYoutubeVideoModel } from '../models/codYoutubeVideoModel';

@Injectable({
  providedIn: 'root'
})
export class VideoclipuriService {
  httpOptions = {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  };
  public url = 'https://localhost:7004/api/Videoclip'

  constructor(
    public http: HttpClient,
  ) { }


  public GetVideoclipuri(): Observable<VideoModel[]> {
    return this.http.get<VideoModel[]>(`${this.url}/videouri`,this.httpOptions);
  }
  
  public GetCodYTVideoclip(idCompetitie:number): Observable<CodYoutubeVideoModel> {
    return this.http.get<CodYoutubeVideoModel>(`${this.url}/codVideo/${idCompetitie}`,this.httpOptions);
  }
  // public RecenzieDataDejaSpComp(email:string, id:number): Observable<boolean> {
  //   return this.http.get<boolean>(`${this.url}/RecenzieSpComp/${email}/${id}`,this.httpOptions);
  // }
  

  // public RecenziiSportiviCompId(id:number): Observable<RecenziiSportiviModel[]> {
  //   return this.http.get<RecenziiSportiviModel[]>(`${this.url}/RecenziiCompetitie/${id}`,this.httpOptions);
  // }

  // public RecenziileSportiv(email:string): Observable<RecenziiSportivModel[]> {
  //   return this.http.get<RecenziiSportivModel[]>(`${this.url}/RecenziiSp/${email}`,this.httpOptions);
  // }


  // public deleteRecenzie(id: Number): Observable<any>{
  //   return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  // }

  public updateVideo(model: VideoModelUpdate ): Observable<any>{
  return this.http.put(`${this.url}`,model, this.httpOptions);
  }

  public createVideoclip(model: videoModelCreate ): Observable<any>{
    return this.http.post<any>(`${this.url}`,model, this.httpOptions);
  }
}
