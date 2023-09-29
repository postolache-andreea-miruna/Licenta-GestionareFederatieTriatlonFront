import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IerarhiePuncteModel } from 'src/app/models/ierarhiePuncteModel';
import { IstoricCluburiTopCompetitieModel } from 'src/app/models/istoricCluburiTopCompetitieModel';
import { ProbaModel } from 'src/app/models/probaModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CluburiService } from 'src/app/services/cluburi.service';
import { IstoriceService } from 'src/app/services/istorice.service';
import { ProbeService } from 'src/app/services/probe.service';

@Component({
  selector: 'app-ierarhie-sportivi',
  templateUrl: './ierarhie-sportivi.component.html',
  styleUrls: ['./ierarhie-sportivi.component.scss']
})
export class IerarhieSportiviComponent implements OnInit{
public top3: {num:number,ierarh:IerarhiePuncteModel}[] = [];
public ierarhie: IerarhiePuncteModel[] = [];

public numeCluburi:string[]=[];
public numeProbe:ProbaModel[]=[];

 anCurent = new Date().getFullYear();
 ani: string[] = [];

 aniCluburi:string[]=[];
 public top3Cluburi: {num:number,ierarh:IstoricCluburiTopCompetitieModel}[] = [];
public ierarhieCluburi: IstoricCluburiTopCompetitieModel[] = [];

 top5SportiviAfisare = true;
 top5CluburiAfisare = false;


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
  private serviceClub: CluburiService,
  private serviceProbe: ProbeService
) { }

ngOnInit(): void {

  for (let an = 2012; an <= this.anCurent; an++) {
    this.ani.push(an.toString());
  }

  const token = localStorage.getItem('token');
  if (token !== null) {
    this.hasToken = true;
    this.validToken(token);
  }
  if (this.email != null) 
  {
    this.getPoza(this.email);
  }

  this.getIstorice();
  this.getNumeCluburi();
  this.getNumeProbe();

  this.getCluburiTop();

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
  categorie:new FormControl('toate categoriile'), 
  club:new FormControl('toate cluburile'),
  an:new FormControl('toti anii'),
  proba:new FormControl('toate probele'),
});

public getNumeCluburi():void{
  this.serviceClub.getNumeCluburi().subscribe(
    (result) => {
      this.numeCluburi = result;
      console.log(this.numeCluburi);
    },
    (error) => {
      console.error(error);
    }
  );
}
public getNumeProbe():void{
  this.serviceProbe.getProbe().subscribe(
    (result) => {
      this.numeProbe = result;
      console.log("probe",this.numeProbe);
    },
    (error) => {
      console.error(error);
    }
  );
}
nuExistaTop3 = false;
public getIstorice(): void {
  this.top3.splice(0, this.top3.length);


  const categorie = this.rezultateFilterForm.get('categorie')?.value;
  console.log("categorie",categorie);

  const club = this.rezultateFilterForm.get('club')?.value;
  console.log("club",club);

  const an = this.rezultateFilterForm.get('an')?.value;
  console.log("an",an);

  const proba = this.rezultateFilterForm.get('proba')?.value;
  console.log("proba",proba);


  this.service.GetIerarhie(categorie,club,an,proba).subscribe(
    (result) => {
      this.ierarhie = result;
      console.log(this.ierarhie);

      

      if(this.ierarhie.length >= 3){
        //podium structura: 2 1 3
          this.top3.push({num: 2, ierarh: this.ierarhie[1]});//loc 2
          this.top3.push({num: 1, ierarh: this.ierarhie[0]});//loc 1
          this.top3.push({num: 3, ierarh: this.ierarhie[2]});//loc 3 
      }
      else if(this.ierarhie.length === 2){
        this.top3.push({num:2,ierarh:this.ierarhie[1]});//loc 2
        this.top3.push({num:1,ierarh:this.ierarhie[0]});//loc 1
      }
      else if(this.ierarhie.length === 1){
        this.top3.push({num:1,ierarh:this.ierarhie[0]});//loc 1
      }
      if(this.top3.length===0){
        this.nuExistaTop3 = true;
      }
      console.log("top",this.top3[0].num);

    },
    (error) => {
      console.error(error);
    }
  );
}

public topCluburiFilterForm: FormGroup = new FormGroup({
  anul:new FormControl('toti anii'),
});

public getCluburiTop(): void {
  this.top3Cluburi.splice(0, this.top3Cluburi.length);


  const anul = this.topCluburiFilterForm.get('anul')?.value;
  console.log("anuul",anul);


  this.service.GetTopCluburi(anul).subscribe(
    (result) => {
      this.ierarhieCluburi = result;
      console.log(this.ierarhieCluburi);

      

      if(this.ierarhieCluburi.length >= 3){
        //podium structura: 2 1 3
          this.top3Cluburi.push({num: 2, ierarh: this.ierarhieCluburi[1]});//loc 2
          this.top3Cluburi.push({num: 1, ierarh: this.ierarhieCluburi[0]});//loc 1
          this.top3Cluburi.push({num: 3, ierarh: this.ierarhieCluburi[2]});//loc 3 
      }
      else if(this.ierarhieCluburi.length === 2){
        this.top3Cluburi.push({num:2,ierarh:this.ierarhieCluburi[1]});//loc 2
        this.top3Cluburi.push({num:1,ierarh:this.ierarhieCluburi[0]});//loc 1
      }
      else if(this.ierarhieCluburi.length === 1){
        this.top3Cluburi.push({num:1,ierarh:this.ierarhieCluburi[0]});//loc 1
      }
      
      console.log("top",this.top3Cluburi[0].num);

    },
    (error) => {
      console.error(error);
    }
  );
}

filtreza(){
  this.getIstorice();
}

filtrezaCluburi(){
  this.getCluburiTop();
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

top5Sportivi(){
  console.log("aici");
  this.top5SportiviAfisare=true;
  this.top5CluburiAfisare=false;
}

top5Cluburi(){
  console.log("cloburi");
  this.top5CluburiAfisare=true;
  this.top5SportiviAfisare=false;
}

}
