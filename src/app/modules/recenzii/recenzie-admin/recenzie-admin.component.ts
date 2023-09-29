import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecenzieCodTextModel } from 'src/app/models/recenzieCodTextModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { RecenziiService } from 'src/app/services/recenzii.service';

@Component({
  selector: 'app-recenzie-admin',
  templateUrl: './recenzie-admin.component.html',
  styleUrls: ['./recenzie-admin.component.scss']
})
export class RecenzieAdminComponent implements OnInit{
  hasToken = false;
  email = localStorage.getItem('email');
  nrMesajeNecitite = 0;

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };
recenzii:RecenzieCodTextModel[]=[];
  constructor(
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceRecenz: RecenziiService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
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
     
      this.getAllRecenzii();
      
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

  public getAllRecenzii():void{
    this.serviceRecenz.GetRecenziiTotal().subscribe(
      (result) =>
      {
        this.recenzii = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteRecenzie(cod:number){
    this.serviceRecenz.deleteRecenzie(cod).subscribe(
     (result)=>{
      location.reload();
    },
    (error) => {
      console.log(error);
    }
    );
  }


  onLogout() {
    this.serviceAuth.logoutAdmin();
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
}
