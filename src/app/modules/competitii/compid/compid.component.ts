import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CompetitiiService } from 'src/app/services/competitii.service';

@Component({
  selector: 'app-compid',
  templateUrl: './compid.component.html',
  styleUrls: ['./compid.component.scss']
})
export class CompidComponent implements OnInit {
  hasToken = false;
  descrierea = false;

  rol = localStorage.getItem('RoleId');

  public sub: Subscription = new Subscription;
  public id: number | undefined;
  public compId = {
    numeCompetitie: 'default nume',
    taxaParticipare: 0,
    dataStart: new Date("2023-03-31T00:00:00"),
    dataFinal: new Date("2023-03-31T00:00:00"),
    paginaOficialaCompetitie: 'default pagina',
    tipCompetitie: 'default tip',
    numarMinimParticipanti: 0
  };

  constructor(
    private service: CompetitiiService,
    private route: ActivatedRoute,
    private router: Router,
    private serviceAuth: AuthentifService,

  ) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id) {
        this.getCompetiteId(this.id);
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

  public getCompetiteId(id: Number): void {
    this.service.getCompetitieInfo(id).subscribe(
      (result) => {
        this.compId = result[0];
        console.log(this.compId);
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

  days: any = "00";
  hours: any = "00";
  minutes: any = "00";
  seconds: any = "00";
  text: string="";

  x = setInterval(() => {
var comp = this.compId.dataStart;
    var startComp = new Date(this.compId.dataStart).getTime();
    var currentDay = new Date().getTime();
    var distanceTime = startComp - currentDay;
    this.days = Math.floor(distanceTime/ (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distanceTime % (1000 * 60 *60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distanceTime % (1000 * 60 *60)) / (1000 * 60));
    this.seconds = Math.floor((distanceTime % (1000 * 60)) /1000);

if(distanceTime<0){
  clearInterval(this.x);
  this.days="00";
  this.hours="00";
  this.minutes="00";
  this.seconds="00";
  this.text = "Această competiție a avut loc"
}

  }, 1000)

  siteCompetitie(){
    window.location.href = this.compId.paginaOficialaCompetitie;
  }

  
  public logAntrenor() {
    const rol = localStorage.getItem('RoleId');
    if (rol !== null)
      this.rol = rol;

    if (this.rol === 'AntrenorUtilizator')
      return true;
    else
      return false;
  }

  rezultate(){
    console.log("id",this.id);
    this.router.navigate(['/ist/istoric',this.id]);
  }
video(){
  this.router.navigate(['/yt/videoclip',this.id]);
}

}


