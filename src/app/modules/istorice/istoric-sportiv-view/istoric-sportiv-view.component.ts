import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IstoricSportivModel } from 'src/app/models/istoricSportivModel';
import { AuthentifService } from 'src/app/services/authentif.service';
import { IstoriceService } from 'src/app/services/istorice.service';

@Component({
  selector: 'app-istoric-sportiv-view',
  templateUrl: './istoric-sportiv-view.component.html',
  styleUrls: ['./istoric-sportiv-view.component.scss']
})
export class IstoricSportivViewComponent implements OnInit{
  @Input() nrLegitimatie: number | undefined;
  
  public sub: Subscription = new Subscription;
  public istoricSp: IstoricSportivModel[] = [];
  constructor(
    private service: IstoriceService,
    private route: ActivatedRoute,
    private serviceAuth: AuthentifService,
  ) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.validToken(token);
    }
    if (this.nrLegitimatie) {
      this.getIstoricSportivLegitimat(this.nrLegitimatie);
    }
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
  public competitiiUnice: { numeCompetitie: string; dataStart: Date; dataFinal: Date; }[] | undefined;

  public getIstoricSportivLegitimat(nrLegitimatie: number): void {
    this.service.GetIstoriceByLegitimatieSportiv(nrLegitimatie).subscribe(
      (result) => {
        this.istoricSp = result;

        //se vor salva in competitiiUnice doar numele de competii unice cu dataStart si dataFinal
        this.competitiiUnice = this.istoricSp
          .map(item => {
            return {
              numeCompetitie: item.numeCompetitie,
              dataStart: item.dataStart,
              dataFinal: item.dataFinal
            };
          })

          /*
          Funcția filter() este folosită pentru eliminarea duplicatelor prin 
          self.findIndex(), care caută prima apariție a valorii elementului curent. 
          Dacă indexul este același cu indexul primei apariții a elementului (nu este un duplicat),
          atunci este păstrat în lista.
          Dacă indexul este diferit (este un duplicat), atunci nu este păstrat.
           */

          .filter((value, index, self) => //value = val curenta, self = aray in care se cauta
            index === self.findIndex(item =>
              item.numeCompetitie === value.numeCompetitie &&
              item.dataStart === value.dataStart &&
              item.dataFinal === value.dataFinal
            )
          );

        console.log("ist", this.istoricSp);
        console.log("unic", this.competitiiUnice);
      },
      (error) => {
        console.error(error);
      }
    );
  }



  getIstoriceComp(competition: any) {
    console.log("istorice cu acelasi nume pentru competitie", this.istoricSp.filter(item => item.numeCompetitie === competition.numeCompetitie));
    return this.istoricSp.filter(item => item.numeCompetitie === competition.numeCompetitie);
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

  checkIfDuplicate(item: any) {
    let duplicates = this.istoricSp.filter(
      (element) =>
        element.numeCompetitie === item.numeCompetitie &&
        element.dataStart === item.dataStart &&
        element.dataFinal === item.dataFinal
    );
    return duplicates.length > 1;
  }
}