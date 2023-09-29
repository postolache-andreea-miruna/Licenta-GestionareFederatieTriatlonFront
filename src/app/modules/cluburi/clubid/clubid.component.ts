import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CluburiService } from 'src/app/services/cluburi.service';

@Component({
  selector: 'app-clubid',
  templateUrl: './clubid.component.html',
  styleUrls: ['./clubid.component.scss']
})
export class ClubidComponent implements OnInit{
  
  hasToken = false;
  descrierea = true;
  sportiClub = false;
  antrClub = false;

  public sub: Subscription = new Subscription;
  public id: Number | undefined;
  public clubId={
    nume: 'default nume',
    email: 'default mail',
    descriere: 'default descriere',
    urlPozaClub: 'default poza profil'
  };

  constructor(
    private clubService: CluburiService,
    private route: ActivatedRoute,
    private serviceAuth: AuthentifService
  ){}


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token!==null) {
      this.hasToken = true;
      this.validToken(token);
    }

    this.sub = this.route.params.subscribe(params =>{
      this.id = +params['id'];
      console.log(this.id);
      if(this.id) {
        this.getClubid(this.id);
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
  public getClubid(id: Number):void{
    this.clubService.getClubInfo(id).subscribe(
      (result) =>
      {
        this.clubId = result[0];
        console.log(this.clubId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  descriere() {
    this.descrierea = true;
    this.sportiClub = false;
    this.antrClub = false;
  }
  sportiviClub(){
    this.descrierea = false;
    this.sportiClub = true;
    this.antrClub = false;
  }
  antrenoriClub(){
    this.descrierea = false;
    this.sportiClub = false;
    this.antrClub = true;
  }
}
