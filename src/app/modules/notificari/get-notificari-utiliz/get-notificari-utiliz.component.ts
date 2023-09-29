import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificariAfisareModel } from 'src/app/models/notificariAfisareModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { ChatService } from 'src/app/services/chat.service';
import { NotificariService } from 'src/app/services/notificari.service';

@Component({
  selector: 'app-get-notificari-utiliz',
  templateUrl: './get-notificari-utiliz.component.html',
  styleUrls: ['./get-notificari-utiliz.component.scss']
})
export class GetNotificariUtilizComponent implements OnInit{

  notificari:NotificariAfisareModel[]=[];
  nrNotifNecitite=0;
  nrMesajeNecitite = 0;
  public id: Number | undefined;

  public notifId = {
    mesaj: 'default mesaj'
  };

  modalRef:any;
  hasToken = false;
  logareRol = "";
  logareRol2 = "";
  email = localStorage.getItem('email');

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };

  constructor(
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private router: Router,
    private serviceNotif: NotificariService,
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private serviceChat: ChatService,

  ) { 
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
    }
    if (this.email != null) 
    {
      this.getPoza(this.email);
    }


    if (this.email) {
        this.getNotificariUtiliz(this.email);
        this.getNrNotifNecitite(this.email);
    }


      
  }
  faraNotificari = false;
  public getNotificariUtiliz(email: string): void {
    this.serviceNotif.GetNotificariLogatUser(email).subscribe(
      (result) => {
        this.notificari = result;
        console.log(this.notificari);
        if(this.notificari.length === 0){
          this.faraNotificari = true;
        }
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

  mesafNotif(id:number,content:any){
    this.serviceNotif.updateNotificare(id).subscribe(
      (result) =>{
        console.log("rez",result);
      },
      (error) => {
        console.log(error);
      }
    );
  
    this.serviceNotif.GetInfoNotifById(id).subscribe(
      (result) => {
        this.notifId = result;
        console.log(this.notifId);
      },
      (error) => {
        console.error(error);
      }
    );
    setTimeout( () => {
      this.modalRef =  this.modalService.open(content, { scrollable: true,centered: true  });
    }, 1000);
  }

 

  mesafNotifCitit(id:number,content:any){

    this.serviceNotif.GetInfoNotifById(id).subscribe(
      (result) => {
        this.notifId = result;
        console.log(this.notifId);
      },
      (error) => {
        console.error(error);
      }
    );
    setTimeout( () => {
      this.modalService.open(content, { scrollable: true,centered: true},);
    }, 1000);
  }



  close() {
    this.modalService.dismissAll();
   if(this.email!=null)
  { this.getNotificariUtiliz(this.email);
   this.getNrNotifNecitite(this.email);}
  }
  public postari(){
    this.router.navigate(['post/postari',this.email]);
  }
  public necitite(){
    this.router.navigate(['/chat']);
  }
}
