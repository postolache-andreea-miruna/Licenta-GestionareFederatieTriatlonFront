import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormulareSportiviByIdModel } from 'src/app/models/formulareSportiviByIdModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { FormulareService } from 'src/app/services/formulare.service';
import { SportiviService } from 'src/app/services/sportivi.service';

@Component({
  selector: 'app-formulare-sportiv',
  templateUrl: './formulare-sportiv.component.html',
  styleUrls: ['./formulare-sportiv.component.scss']
})
export class FormulareSportivComponent implements OnInit{
  public formulare: FormulareSportiviByIdModel[] = [];

  hasToken = false;
  logareRol = "";
  logareRol2 = "";
  
  isFormComplete = false;

  email = localStorage.getItem('email');

  public nenulEmail(){ //pentru a transmite email ca string
  if(this.email!=null)
  return this.email;
  else
  return "";
}

  public sub: Subscription = new Subscription;
  public emailul: string | undefined;

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };

  constructor(
    private service: SportiviService,
    private serviceAntr: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceForm: FormulareService,

    private route: ActivatedRoute,
    private router: Router,
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
      console.log(params);
      this.emailul = params['email'];
      if (this.emailul) {
        this.getFormulare(this.emailul);
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
  public getPoza(email: string): void {
    this.serviceAntr.getUrlUtilizator(email).subscribe(
      (result) => {
        this.pozaProfil = result;
        console.log(this.pozaProfil);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getFormulare(email: string): void {
    this.serviceForm.GetFormulareBySpEmail(email).subscribe(
      (result) => {
        this.formulare = result;
        console.log(this.formulare);
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
  public logAntrenor() {
    const rol = localStorage.getItem('RoleId');
    if (rol !== null)
      this.logareRol = rol;

    if (this.logareRol === 'AntrenorUtilizator')
      return true;
    else
      return false;
  }
  public logSportiv() {
    const rol = localStorage.getItem('RoleId');
    if (rol !== null)
      this.logareRol2 = rol;

    if (this.logareRol2 === 'SportivUtilizator')
      return true;
    else
      return false;
  }

  formDetails(codForm: number){
    this.router.navigate(['/form/formularId', codForm]);
  }


}
