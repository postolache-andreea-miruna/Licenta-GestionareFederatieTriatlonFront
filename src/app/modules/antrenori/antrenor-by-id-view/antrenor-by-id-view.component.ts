import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';

@Component({
  selector: 'app-antrenor-by-id-view',
  templateUrl: './antrenor-by-id-view.component.html',
  styleUrls: ['./antrenor-by-id-view.component.scss']
})
export class AntrenorByIdViewComponent implements OnInit{
  hasToken = false;
  logareRol = "";

  email = localStorage.getItem('email');


  public sub: Subscription = new Subscription;
  public emailul: string | undefined;
  public antrenorId = { 
    nume: 'default nume',
    prenume: 'default prenume',
    gradPregatire: 'default pregatire',
    urlPozaProfil: 'default poza', 
    numeClub: 'default club',
    email: 'default email',
  };

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };

  constructor(
    private service: AntrenoriService,
    private route: ActivatedRoute,
    private serviceAuth: AuthentifService,
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }
    if (this.email != null) 
    {
      this.getPoza(this.email);
    }

    this.sub = this.route.params.subscribe(params => {
      this.emailul = params['email'];
      if (this.emailul) {
        this.getAntrenorViewBySp(this.emailul);
      }
    });  
  }
  public validToken(token:string){
    this.serviceAuth.tokenValid(token).subscribe(
      (result)=>{
        if(result === true){
          this.onLogout();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onLogout() {
    this.serviceAuth.logout();
   setTimeout(function () {
    window.location.reload();
  }, 1000);
  }
  public getPoza(email: string): void {
    this.service.getUrlUtilizator(email).subscribe(
      (result) => {
        this.pozaProfil = result;
        console.log(this.pozaProfil);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getAntrenorViewBySp(email: string): void {
    this.service.getAntrenorView(email).subscribe(
      (result) => {
        this.antrenorId = result;
        console.log(this.antrenorId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public logAntrenor() {
    const rol = localStorage.getItem('RoleId');
    if (rol !== null)
      this.logareRol = rol;

    if (this.logareRol === 'AntrenorUtilizator')
      return true;
    else
      return false;
  }
}
