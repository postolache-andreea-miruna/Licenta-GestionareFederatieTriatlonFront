import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentifService } from 'src/app/services/authentif.service';
import { RecenziiService } from 'src/app/services/recenzii.service';

@Component({
  selector: 'app-recenzie-medie',
  templateUrl: './recenzie-medie.component.html',
  styleUrls: ['./recenzie-medie.component.scss']
})
export class RecenzieMedieComponent implements OnInit{
   
    email = localStorage.getItem('email');
    public sub: Subscription = new Subscription;
    public id: number | undefined;
    public recenzieMedie = 0;
    currentRate=0;
  

    constructor(
      private service: RecenziiService,
      private route: ActivatedRoute,
      private serviceAuth: AuthentifService,
    ) { }
  
    ngOnInit() {
      const token = localStorage.getItem('token');
      if (token !== null) {
        this.validToken(token);
      }
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
        console.log(this.id);
        if (this.id) {
          this.getNumarMediuStele(this.id);
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
    public getNumarMediuStele(id: number): void {
      this.service.GetCompetitieSteleMedie(id).subscribe(
        (result) => {
          this.recenzieMedie = result; //se rotunjeste prin majorare
          console.log(this.recenzieMedie);
          this.currentRate  = this.recenzieMedie;
          console.log("currentRate",this.currentRate);           
        },
        (error) => {
          console.error(error);
        }
      );
    }
    
}
