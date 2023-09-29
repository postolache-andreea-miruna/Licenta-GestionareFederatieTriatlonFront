import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CodYoutubeVideoModel } from 'src/app/models/codYoutubeVideoModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { ChatService } from 'src/app/services/chat.service';
import { NotificariService } from 'src/app/services/notificari.service';
import { VideoclipuriService } from 'src/app/services/videoclipuri.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit{
  public codYT: CodYoutubeVideoModel | undefined; 
  public sub: Subscription = new Subscription;
  public id: number | undefined;
  currentVideoId="";

  player: any;
  playerVars: YT.PlayerVars = {
    start: 2
  };
  showPlayer: boolean = false;

 
  savePlayer(player:any){
    this.player= player;
    console.log('player instance', player);
  }

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
    private serviceVideo: VideoclipuriService,
    private route: ActivatedRoute,
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceNotif: NotificariService,
    private serviceChat: ChatService,
    private router: Router
  ){}
  ngOnInit(): void {
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


    this.sub = this.route.params.subscribe(params =>{
      this.id = +params['id'];
      console.log(this.id);
      if(this.id) {
        this.getCodYTVideo(this.id);
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

  getCodYTVideo(id:number){
    this.serviceVideo.GetCodYTVideoclip(id).subscribe(
      (result) =>
      {
        this.codYT = result;
        console.log("codyt",this.codYT);
        this.currentVideoId = this.codYT.codYoutubeVideo;
        this.showPlayer = true;
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
