import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { RecenziiSportiviModel } from 'src/app/models/recenziiSportiviModel';
import { AuthentifService } from 'src/app/services/authentif.service';
import { RecenziiService } from 'src/app/services/recenzii.service';

@Component({
  selector: 'app-recenzii-comp-id',
  templateUrl: './recenzii-comp-id.component.html',
  styleUrls: ['./recenzii-comp-id.component.scss']
})
export class RecenziiCompIdComponent implements OnInit{
 
  email = localStorage.getItem('email');
  public sub: Subscription = new Subscription;
  public id: number | undefined;
  public recenzii: RecenziiSportiviModel[] = [];
  currentRate=0;

  esteSportiv = false;

  constructor(
    private service: RecenziiService,
    private route: ActivatedRoute,
    private serviceAuth: AuthentifService,
  ) { }

  ngOnInit() {

    if(localStorage.getItem('RoleId') === 'SportivUtilizator'){
      this.esteSportiv = true;
    }
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.validToken(token);
    }
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id) {
        this.getRecenzii(this.id);
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
  public getRecenzii(id: number): void {
    this.service.RecenziiSportiviCompId(id).subscribe(
      (result) => {
        this.recenzii = result;
        console.log("recenzii",this.recenzii);         
      },
      (error) => {
        console.error(error);
      }
    );
  }

 index = 0;
 recenziiVizibile = 3;
 next() {
  if (this.index + this.recenziiVizibile < this.recenzii.length) {
    this.index += 1;
  }
}

prev() {
  if (this.index > 0) {
    this.index -= 1;
  }
}

}
