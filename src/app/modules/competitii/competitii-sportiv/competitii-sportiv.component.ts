import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitiiModel } from 'src/app/models/competitiiModel';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CompetitiiService } from 'src/app/services/competitii.service';

@Component({
  selector: 'app-competitii-sportiv',
  templateUrl: './competitii-sportiv.component.html',
  styleUrls: ['./competitii-sportiv.component.scss']
})
export class CompetitiiSportivComponent implements OnInit {

  compAnulata = {
    codCompetitie:0,
    statusCompetitie:'default status'
  };
  click = 0;
  compAnulataMesaj = false;
  email = localStorage.getItem('email');
  public nenulEmail(){ //pentru a transmite email ca string
    if(this.email!=null)
    return this.email;
    else
    return "";
  }
  public competitii: CompetitiiModel[] = [];
  hasToken = false;
  constructor(
    private service: CompetitiiService,
    private router: Router,
    private serviceAuth: AuthentifService,
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }

    this.service.getCompetitiiSportiv(this.nenulEmail()).subscribe(
      (result: CompetitiiModel[]) => {
        console.log(result);
        this.competitii = result;
      },
      (error) => {
        console.error(error);
      }
    );
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
  goToCompetitiiDetails(codCompetitie: number, statusCompetitie: string) {
    
    const competitie = {codCompetitie,statusCompetitie};
    if(statusCompetitie === 'anulata')
      this.compAnulata = competitie;//dand ca parametru competitia cu codul si statusul putem sa afisam doar pentru acea competitie in front
    else
    this.router.navigate(['/comp/competitiiId', codCompetitie]);

    this.click++;
    this.compAnulataMesaj = (this.click % 2 !== 0);

  }

  public sameDates(dataStart: Date, dataFinal: Date) {
//desi e parametrul de tip Date el este o instanta de tip string
  const dataS = new Date(dataStart);
  const dataF = new Date(dataFinal);

    const yearStart = dataS.getFullYear();
    const monthStart = dataS.getMonth();
    const dayStart = dataS.getDate();
  
    const yearFinal = dataF.getFullYear();
    const monthFinal = dataF.getMonth();
    const dayFinal = dataF.getDate();
  
    if (yearStart === yearFinal && monthStart === monthFinal && dayStart === dayFinal) {
      return true;
    } else {
      return false;
    }
  }
}
