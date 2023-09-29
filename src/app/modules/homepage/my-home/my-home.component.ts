import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { ChatService } from 'src/app/services/chat.service';
import { NotificariService } from 'src/app/services/notificari.service';
@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.scss']
})
export class MyHomeComponent implements OnInit {
  //'https://d2p6e6u75xmxt8.cloudfront.net/2/2020/04/Triathlon-profimedia-0445365556.jpg'
  //'https://i0.wp.com/triathlonsportslife.com/wp-content/uploads/2018/01/Open-Water-Swim-LobsterMan.jpg?fit=696%2C387&ssl=1'
  //--poza actuala alergare -> https://pixabay.com/photos/sports-race-run-triathlon-2984610/  - gratuit
  //poza veche alergare -> 'https://transylvaniatriathlonfestival.ro/wp-content/uploads/2022/02/galeria-10.jpg' 
  //poza noua generatie - 'https://triatlonromania.ro/wp-content/uploads/2018/06/Ptoto-FRTRI-Radu-Cristi-02-w.jpg'
  images = [
    'https://www.biciclistul.ro/wp-content/uploads/Peter-Klosz-presedinte-Federatia-Romana-de-Triatlon.jpg',
    "assets/photos/nouaGeneratieTri.JPG",
    "assets/photos/inotTriRomania.png",
    "assets/photos/ciclismTriRomania.jpeg",
    "assets/photos/alergareTri.jpg",
  ]

  hasToken = false;
  logareRol = "";
  logareRol2 = "";
  email = localStorage.getItem('email');
  nrNotifNecitite=0;
  nrMesajeNecitite = 0;


  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };

  constructor(
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceNotif: NotificariService,
    private serviceChat: ChatService,
    private router: Router
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
      this.getNrNotifNecitite(this.email);
      this.getNrMesajeNecitite(this.email);
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
  public getPoza(email: string): void {
    this.service.getUrlUtilizator(email).subscribe(
      (result) => {
        this.pozaProfil = result;
        console.log(this.pozaProfil);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getNrNotifNecitite(email: string): void {
    this.serviceNotif.GetNrNotifNecitite(email).subscribe(
      (result) => {
        this.nrNotifNecitite = result;
        console.log(this.nrNotifNecitite);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getNrMesajeNecitite(email: string): void {
    this.serviceChat.nrMesajeNecititeTotal(email).subscribe(
      (result) => {
        this.nrMesajeNecitite = result;
        console.log(this.nrMesajeNecitite);
      },
      (error) => {
        console.error(error);
      }
    );
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


  public notific(){
    this.router.navigate(['notif/notificari',this.email]);
  }
  public necitite(){
    this.router.navigate(['/chat']);
  }
  public postari(){
    this.router.navigate(['post/postari',this.email]);
  }
}
