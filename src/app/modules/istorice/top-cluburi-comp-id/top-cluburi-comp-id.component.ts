import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartOptions, Color, LabelItem } from 'chart.js';
import { ColorsPluginOptions } from 'chart.js/dist/plugins/plugin.colors';
import { Subscription } from 'rxjs';
import { IstoricCluburiTopCompetitieModel } from 'src/app/models/istoricCluburiTopCompetitieModel';
import { AuthentifService } from 'src/app/services/authentif.service';
import { IstoriceService } from 'src/app/services/istorice.service';
@Component({
  selector: 'app-top-cluburi-comp-id',
  templateUrl: './top-cluburi-comp-id.component.html',
  styleUrls: ['./top-cluburi-comp-id.component.scss']
})
export class TopCluburiCompIdComponent implements OnInit{
  
public top3: {num:number,ierarh:IstoricCluburiTopCompetitieModel}[] = [];
public ierarhie: IstoricCluburiTopCompetitieModel[] = [];

public sub: Subscription = new Subscription;
public id: number | undefined;
  public topClub = {
    numeClub: 'default nume',
    puncte: 0,
  };

  public chartValues: string[]=[];
  public seriesValues: number[]=[];

  public pieOption: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins:{
      legend: {
        labels: {
          font: {
            size: 20
          }
        }
      }
    }
  };
  public etichete: string[]=[];
  public dataPie: {data:number[]}[]=[];

constructor(

  private service: IstoriceService,
  private route: ActivatedRoute,
  private serviceAuth: AuthentifService,
) { }

ngOnInit(): void {

  Chart.defaults.font.size = 15; 
  const token = localStorage.getItem('token');
  if (token !== null) {
    this.validToken(token);
  }

  this.sub = this.route.params.subscribe(params => {
    this.id = params['id'];
    console.log(this.id);
    if (this.id) {
      this.getTopCluburi(this.id);
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
public getTopCluburi(id:number): void {
  this.top3.splice(0, this.top3.length);

  this.service.GetTopCluburiCompId(id).subscribe(
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

      if(this.ierarhie.length!==0){
        for(let index=0;index<this.ierarhie.length;index++){
          this.etichete.push(this.ierarhie[index].numeClub);
          this.seriesValues.push(this.ierarhie[index].puncte);
        }
        this.dataPie.push({data:this.seriesValues});
        console.log("data",this.dataPie[0].data);
      }

    },
    (error) => {
      console.error(error);
    }
  );
}

}
