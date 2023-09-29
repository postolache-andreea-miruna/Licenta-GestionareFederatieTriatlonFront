import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostareModelTotal } from 'src/app/models/postareModelTotal';
import { AuthentifService } from 'src/app/services/authentif.service';
import { PostariService } from 'src/app/services/postari.service';
import { ProbeService } from 'src/app/services/probe.service';

@Component({
  selector: 'app-postare-admin',
  templateUrl: './postare-admin.component.html',
  styleUrls: ['./postare-admin.component.scss']
})
export class PostareAdminComponent implements OnInit{
  postari:PostareModelTotal[]=[];
  hasToken = false;
  email = localStorage.getItem('email');
  constructor(
    private serviceAuth: AuthentifService,
    private servicePostari: PostariService,
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
      this.getPostari();
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

  public getPostari(): void {

    this.servicePostari.GetAllPostari().subscribe(
      (result) => {
        this.postari = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  deletePoza(cod:number){
    this.servicePostari.deletePostare(cod).subscribe(
      (result)=>{
        this.getPostari();
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
}
