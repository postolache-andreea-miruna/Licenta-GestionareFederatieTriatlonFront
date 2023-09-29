import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { ChatService } from 'src/app/services/chat.service';
import { NotificariService } from 'src/app/services/notificari.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
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
    }
    if (this.email != null) 
    {
      this.getPoza(this.email);
      this.getNrNotifNecitite(this.email);
      this.getNrMesajeNecitite(this.email);
    }
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
