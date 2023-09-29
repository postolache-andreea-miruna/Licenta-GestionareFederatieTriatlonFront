import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentifService {
  // constructor(private http: HttpClient,private jwtService : JwtHelperService) { }

  // private authUrl = 'https://localhost:7004/api/Autentificare';
  // httpOtions = {
  //   headers : new HttpHeaders(
  //     {
  //        'Content-Type' : 'application/json'
  //     }
  //   )
  // };
  // login(userData : any) : Observable<any> {
  //   return this.http.post<any>(`${this.authUrl}/logare`, userData)
  //   .pipe(map((respone : any) => {
  //     if(respone?.token){ //daca a mers bine logarea
  //       localStorage.setItem('token', respone.token); //token primit de la back
  //     }
  //   }));
  // }

  

  private authUrl = 'https://localhost:7004/api/Autentificare';

  private Url = 'https://localhost:7004/api/Antrenor';

  httpOtions = {
    headers : new HttpHeaders(
      {
         'Content-Type' : 'application/json'
      }
    )
  };

  constructor(private http: HttpClient,private router: Router, private jwtService : JwtHelperService) { }


  // public getAntrenorById(id: string): Observable<AntrenorById> 
  // {
  //   return this.http.get<AntrenorById>(`${this.Url}/byId/${id}`);
  // }

  public tokenValid(token:string): Observable<boolean> {
    return this.http.get<boolean>(`${this.authUrl}/tokenValid/${token}`);
  }


  register(userData: any) : Observable<any> {
    return this.http.post<any>(`${this.authUrl}/inregistrare`,userData)
    .pipe(map(() => {
      this.router.navigate(['/auth/login']); //dupa ca te-ai inregistrat mergi sa te loghezi
    }));
  }


  login(userData : any) : Observable<any> {
    return this.http.post<any>(`${this.authUrl}/logare`, userData)
    .pipe(map((respone : any) => {
      if(respone?.token){ //daca a mers bine logarea
        localStorage.setItem('token', respone.token); //token primit de la back
        this.router.navigate(['/home']);
      }
    }));
  }

  loginAdmin(userData : any) : Observable<any> {
    return this.http.post<any>(`${this.authUrl}/logare`, userData)
    .pipe(map((respone : any) => {
      if(respone?.token){ //daca a mers bine logarea
        localStorage.setItem('token', respone.token); //token primit de la back
        this.router.navigate(['/admin/home']);
      }
    }));
  }

  roles(userData:any):Observable<any>{
    return this.http.post<any>(`${this.authUrl}/rol`, userData)
    .pipe(map((response : any) =>
    {
      localStorage.setItem('RoleId',response);
     
    }));
  }

    //se verifica daca tokenul este expirat sau nu
  isLoggedIn(){
    const token = localStorage.getItem('token') || ""; //daca e null pun string gol
    //folosim pachetul npm install @auth0/angular-jwt  --lucreaza cu tokenuri jwt
    return !this.jwtService.isTokenExpired(token); //userul este logat cand tokenul nu e expirat
  }
  
  logout() {
    localStorage.removeItem('token'); //am sters token deci nu mai sunt logat
    localStorage.removeItem('RoleId');
    localStorage.removeItem('email');
    this.router.navigate(['/home']);
  }

  logoutAdmin() {
    localStorage.removeItem('token'); //am sters token deci nu mai sunt logat
    localStorage.removeItem('RoleId');
    localStorage.removeItem('email');
    this.router.navigate(['auth/admin/login']);
  }
}
