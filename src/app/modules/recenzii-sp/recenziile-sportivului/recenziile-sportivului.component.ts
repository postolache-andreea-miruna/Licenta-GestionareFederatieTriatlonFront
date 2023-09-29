import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { RecenziiSportivModel } from 'src/app/models/recenziiSportivModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { RecenziiService } from 'src/app/services/recenzii.service';

@Component({
  selector: 'app-recenziile-sportivului',
  templateUrl: './recenziile-sportivului.component.html',
  styleUrls: ['./recenziile-sportivului.component.scss']
})
export class RecenziileSportivuluiComponent implements OnInit{
  public recenzii: RecenziiSportivModel[] = [];

  hasToken = false;
  logareRol = "";
  logareRol2 = "";
  currentRate=0;
  
  isFormComplete = false;

  email = localStorage.getItem('email');

  public nenulEmail(){ //pentru a transmite email ca string
  console.log("email-loc",this.email);
  if(this.email!=null)
  return this.email;
  else
  return "";
}

  public sub: Subscription = new Subscription;

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };

  constructor(
    private modalService: NgbModal,
    private serviceAntr: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceRecenz: RecenziiService,
    private route: ActivatedRoute
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
      console.log("parms",params);
      if (this.email) {
        this.getRecenzii(this.email);
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

  public getRecenzii(email: string): void {
    this.serviceRecenz.RecenziileSportiv(email).subscribe(
      (result) => {
        this.recenzii = result;
        console.log(this.recenzii);
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

  public recenzieUpdateForm: FormGroup = new FormGroup({
    codRecenzie: new FormControl(0),
    text: new FormControl('')
  });


  public editRec(content: any,cod:number,text:string) {
    this.modalService.open(content, { centered: true });

    const codul = cod;
    
    this.recenzieUpdateForm.get('text')?.setValue(text);
    this.recenzieUpdateForm.get('codRecenzie')?.setValue(codul);
  }

 

  public saveAdd(): void{

    this.serviceRecenz.updateRecenzie(this.recenzieUpdateForm.value).subscribe(
      (result) =>{
        console.log("rez",result);
      },
      (error) => {
        console.log(error);
      }
    );
  
    this.modalService.dismissAll();
  
    location.reload();
  }

}
