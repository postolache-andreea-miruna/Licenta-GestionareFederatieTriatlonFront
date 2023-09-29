import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentifService } from 'src/app/services/authentif.service';
import { SportiviService } from 'src/app/services/sportivi.service';

@Component({
  selector: 'app-sportivi-by-id-view',
  templateUrl: './sportivi-by-id-view.component.html',
  styleUrls: ['./sportivi-by-id-view.component.scss']
})
export class SportiviByIdViewComponent implements OnInit{
  hasToken = false;
  logareRol="";
  email = localStorage.getItem('email');

  public sub: Subscription = new Subscription;
  public emailul: string | undefined;
  public sportivId = { 
    numarLegitimatie:0,
    urlPozaProfil: 'default poza', 
    nume: 'default nume',
    prenume: 'default prenume',
    gen: 'default gen',
    anNastere: 0,
    numeClub: 'default club'
  };

  constructor(
    private service: SportiviService,
    private route: ActivatedRoute,
    private serviceAuth: AuthentifService,
  ) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }

    this.sub = this.route.params.subscribe(params => {
      this.emailul = params['emailul'];
      if (this.emailul) {
        this.getSportivId(this.emailul);
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
  public logAntrenor(){
    const rol = localStorage.getItem('RoleId');
    if(rol !== null)
      this.logareRol = rol;
      
    if(this.logareRol === 'AntrenorUtilizator') 
      return true;
      else
      return false;
  }

  public getSportivId(email: string): void {
    this.service.getSportivByEmail(email).subscribe(
      (result) => {
        this.sportivId = result;
        console.log(this.sportivId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public showBestOf = false;
  public showIstoric = false;
  public showPostari = true;
  
  public openBestOf(){
    this.showIstoric = false;
    this.showPostari = false;
    this.showBestOf = true;
  }
  public openIsto(){
    this.showIstoric = true;
    this.showBestOf = false;
    this.showPostari = false;
  }

  public openPostari(){
    this.showIstoric = false;
    this.showBestOf = false;
    this.showPostari = true;
  }
}
