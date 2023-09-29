import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IstoricRezultateCompetitieModel } from 'src/app/models/istoricRezultateCompetitieModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { IstoriceService } from 'src/app/services/istorice.service';

@Component({
  selector: 'app-rezultate-competitie-filtrate',
  templateUrl: './rezultate-competitie-filtrate.component.html',
  styleUrls: ['./rezultate-competitie-filtrate.component.scss']
})
export class RezultateCompetitieFiltrateComponent {
  public rezultate: IstoricRezultateCompetitieModel[] = [];
  public numeProbeParticipante:string[]=[];
  public numeComp:string|undefined;
  public categoriiParticipante: string[]=[];
  public numeCluburiParticipante:string[]=[];

  clickTopCluburi = false;

  public sub: Subscription = new Subscription;
  public id: number | undefined;
  hasToken = false;
  logareRol = "";
  logareRol2 = "";
  email = localStorage.getItem('email');

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };

  constructor(
    private serviceAntr: AntrenoriService,
    private serviceAuth: AuthentifService,
    private service: IstoriceService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
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
      this.id = params['id'];
      console.log(this.id);
      if (this.id) {
        this.getRezultateCompFiltrate(this.id);
        this.getNumeProbe(this.id);
        this.getCategorii(this.id);
        this.getCluburi(this.id);
        this.getNumeComp(this.id);
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

  public rezultateFilterForm: FormGroup = new FormGroup({
    numeProba:new FormControl('toate probele'), 
    categorie:new FormControl('toate categoriile'),
    club:new FormControl('toate cluburile'),
  });

  public getNumeProbe(id:number):void{
    this.service.GetNumeProbeComp(id).subscribe(
      (result) => {
        this.numeProbeParticipante = result;
        console.log(this.numeProbeParticipante);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getCategorii(id:number):void{
    this.service.GetCategoriiComp(id).subscribe(
      (result) => {
        this.categoriiParticipante = result;
        console.log(this.categoriiParticipante);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getCluburi(id:number):void{
    this.service.GetCluburiComp(id).subscribe(
      (result) => {
        this.numeCluburiParticipante = result;
        console.log(this.numeCluburiParticipante);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getNumeComp(id:number):void{
    this.service.GetNumeComp(id).subscribe(
      (result) => {
        this.numeComp = result[0];
        console.log(this.numeComp);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getRezultateCompFiltrate(id: number): void {

    const numeProba = this.rezultateFilterForm.get('numeProba')?.value;
    console.log("proba",numeProba);

    const categorie = this.rezultateFilterForm.get('categorie')?.value;
    console.log("categorie",categorie);

    const club = this.rezultateFilterForm.get('club')?.value;
    console.log("club",club);


    this.service.GetRezultateCompetitieFiltrareProba(id,numeProba,categorie,club).subscribe(
      (result) => {
        this.rezultate = result;
        console.log(this.rezultate);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filtreza(){
    if(this.id !==undefined)
      this.getRezultateCompFiltrate(this.id);
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

  public topCluburi(){
  this.clickTopCluburi = !this.clickTopCluburi;
  }

}
