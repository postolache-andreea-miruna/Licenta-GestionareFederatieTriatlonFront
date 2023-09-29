import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { FormulareService } from 'src/app/services/formulare.service';
import { SportiviService } from 'src/app/services/sportivi.service';

@Component({
  selector: 'app-formular-id',
  templateUrl: './formular-id.component.html',
  styleUrls: ['./formular-id.component.scss']
})
export class FormularIdComponent implements OnInit{

  hasToken = false;
  logareRol = "";
  logareRol2 = "";
  
  isFormComplete = false;

  email = localStorage.getItem('email');
  public afisareImag = false;
  public imagUrl = "";

  public nenulEmail(){ //pentru a transmite email ca string
  if(this.email!=null)
  return this.email;
  else
  return "";
}

  public sub: Subscription = new Subscription;
  public id: number | undefined;
  public formId={
    pozaProfil : 'default poza profil',
    avizMedical: 'default aviz',
    buletin_CertificatNastere: 'default certif/buletin',
    completareFormular: 'default completare',
  };

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
      this.id = params['id'];
      if (this.id) {
        this.getFormularId(this.id);
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

  public getFormularId(id: number): void {
    this.serviceForm.GetFormInfo(id).subscribe(
      (result) => {
        this.formId = result;
        console.log(this.formId);
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

  public afisare(url: string){
    this.afisareImag = true;
    this.imagUrl = url;
  }

  public inchideImag(){
    this.afisareImag = false;
  }

}
