import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComentariiCodTextModel } from 'src/app/models/comentariiCodTextModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { ComentariiService } from 'src/app/services/comentarii.service';

@Component({
  selector: 'app-comentariu-admin',
  templateUrl: './comentariu-admin.component.html',
  styleUrls: ['./comentariu-admin.component.scss']
})
export class ComentariuAdminComponent implements OnInit{


  hasToken = false;
  email = localStorage.getItem('email');
  nrMesajeNecitite = 0;

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };
comentarii:ComentariiCodTextModel[]=[];
  constructor(
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceCom: ComentariiService,
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
     
      this.getAllComentarii();
      
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
  public getAllComentarii():void{
    this.serviceCom.GetComentariiTotal().subscribe(
      (result) =>
      {
        this.comentarii = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteComentariu(cod:number){
    this.serviceCom.deleteComentariu(cod).subscribe(
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
