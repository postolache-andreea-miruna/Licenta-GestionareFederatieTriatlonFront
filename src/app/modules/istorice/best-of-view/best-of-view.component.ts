import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IstoricSportivBestOfModel } from 'src/app/models/istoricSportivBestOfModel';
import { AuthentifService } from 'src/app/services/authentif.service';
import { IstoriceService } from 'src/app/services/istorice.service';

@Component({
  selector: 'app-best-of-view',
  templateUrl: './best-of-view.component.html',
  styleUrls: ['./best-of-view.component.scss']
})
export class BestOfViewComponent implements OnInit {
  @Input() nrLegitimatie: number | undefined;
  

  public sub: Subscription = new Subscription;
  public bestOfSp: IstoricSportivBestOfModel[] = [];
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
    console.log(this.nrLegitimatie);
    if (this.nrLegitimatie) {
      this.getBestOfLegitimat(this.nrLegitimatie);
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
  public getBestOfLegitimat(nrLegitimatie: number): void {
    this.service.GetBestofByLegitimatieSportiv(nrLegitimatie).subscribe(
      (result) => {
        this.bestOfSp = result;
        console.log("bestOf", this.bestOfSp);
      },
      (error) => {
        console.error(error);
      }
    );
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
