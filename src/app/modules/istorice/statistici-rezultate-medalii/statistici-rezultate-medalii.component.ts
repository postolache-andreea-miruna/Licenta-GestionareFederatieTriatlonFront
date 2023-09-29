import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chart, ChartOptions,registerables } from 'chart.js';
import { config } from 'rxjs';
import { CompetitiiNumeModel } from 'src/app/models/competitiiNumeModel';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CompetitiiService } from 'src/app/services/competitii.service';
import { IstoriceService } from 'src/app/services/istorice.service';

@Component({
  selector: 'app-statistici-rezultate-medalii',
  templateUrl: './statistici-rezultate-medalii.component.html',
  styleUrls: ['./statistici-rezultate-medalii.component.scss']
})
export class StatisticiRezultateMedaliiComponent implements OnInit{

  graficul: any=[];
  graficulPodium: any=[];
  public statisticaMedalii :number[]=[];
  public statisticaPodium:number[]=[];
  public numeCompetitii: CompetitiiNumeModel[]=[]

  public title="faf";
  public nenulEmail(){ //pentru a transmite email ca string
    if(this.email!=null)
    return this.email;
    else
    return "";
  }
  email = localStorage.getItem('email');
  constructor(
    private service: IstoriceService,
    private serviceComp: CompetitiiService,
    private serviceAuth: AuthentifService,
  ){
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.validToken(token);
    }
    Chart.defaults.font.size = 20; 
    Chart.defaults.font.weight = 'bold';
    Chart.defaults.borderColor = 'rgba(20, 126, 219, 0.767)';
    Chart.defaults.backgroundColor = '#9BD0F5';
    this.serviceComp.getCompetitiiNume().subscribe(
      (result) => {
        this.numeCompetitii = result;
        console.log(this.numeCompetitii);
      },
      (error) => {
        console.error(error);
      }
    );

    if(this.email!== null){
      this.getMedalii();
      this.getPodium();
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

  public statisticaFilterForm: FormGroup = new FormGroup({
    numeCompetitie:new FormControl('toate competițiile'), 
  });

  public getMedalii(){
    const numeCompetitie = this.statisticaFilterForm.get('numeCompetitie')?.value;
    console.log("numeCompetitie",numeCompetitie);

    this.service.GetStatisticaMedaliiSpAntrComp(this.nenulEmail(),numeCompetitie).subscribe(
      (result) => {
        this.statisticaMedalii = result;


        this.graficul = new Chart('canvas',{
          type:'bar',
          
          options:{
            plugins: {
              title: {
                  display: true,
                  text: 'Locurile obținute de sportivi'
              }
          },
            scales:{
              y: {
                ticks: {
                  stepSize:1
                }
              }
            }
          },
          data:{
            labels: ['Loc 1','Loc 2','Loc 3'],
            datasets:[{
              data:this.statisticaMedalii,
              label:'Locurile sportivilor',
              backgroundColor: ["rgb(183, 223, 219)", "rgb(202, 180, 219)", "rgb(255, 165, 146)"],   
              barThickness: 100,
            }],
          }
        })
        console.log(this.statisticaMedalii);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  public getPodium(){
    const numeCompetitie = this.statisticaFilterForm.get('numeCompetitie')?.value;
    console.log("numeCompetitie",numeCompetitie);

    this.service.GetStatisticaPodiumSpAntrComp(this.nenulEmail(),numeCompetitie).subscribe(
      (result) => {
        this.statisticaPodium = result;


        this.graficulPodium = new Chart('canvasul',{
          type:'pie',
          options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Procent sportivi medaliați/nemedaliați '
                }
            }
        },
          data:{
            labels: ['Medaliați','Nemedaliați'],
            datasets:[{
              data:this.statisticaPodium,
              label:'Medaliere',
            }],
          }
        })



        console.log(this.statisticaPodium);
      },
      (error) => {
        console.error(error);
      }
    );

  }

  filtreza(){
    this.graficul.destroy();
    this.graficulPodium.destroy();
    this.getMedalii();
    this.getPodium();
  }
}
