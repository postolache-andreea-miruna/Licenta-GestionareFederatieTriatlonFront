import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Online } from '../models/online';
import { PrivateChatComponent } from '../private-chat/private-chat.component';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { AntrenoriService } from '../services/antrenori.service';
import { AuthentifService } from '../services/authentif.service';
import { NotificariService } from '../services/notificari.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnDestroy{
  @Output() closeChatEmitter = new EventEmitter();
  hasToken = false;
  logareRol = "";
  logareRol2 = "";
  emailLogat = localStorage.getItem('email');
  nrNotifNecitite=0;
  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };
  constructor(
    public chatService: ChatService,
     private modalService: NgbModal,
    private router: Router,
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceNotif: NotificariService,
     ){}
  ngOnDestroy(): void {
    this.chatService.stopChatConnection();
  }
  ngOnInit(): void {
    const emailul = localStorage.getItem('email');
    if (emailul !== null) {
      this.chatService.email = emailul;
      this.getPoza(emailul);
      this.getNrNotifNecitite(emailul);
    }
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }
  
    console.log(this.chatService.email);
    console.log(this.chatService.onlineUsers);
    console.log("offline",this.chatService.usersOffline);
    console.log("usersMessagesOnline",this.chatService.usersOnlineMessages);
    this.chatService.createConnection();
  }

  public backToHome(){
    this.closeChatEmitter.emit();
  }

  openPrivateChat(toUser: Online){ 
    const modalRef = this.modalService.open(PrivateChatComponent,{centered:true});
    modalRef.componentInstance.toUser = toUser;
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
    this.router.navigate(['notif/notificari',this.emailLogat]);
  }
  public necitite(){
    this.router.navigate(['/chat']);
  }
  public postari(){
    this.router.navigate(['post/postari',this.emailLogat]);
  }

}
