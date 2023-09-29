import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthentifService } from 'src/app/services/authentif.service';
import { RecenziiService } from 'src/app/services/recenzii.service';

@Component({
  selector: 'app-creare-recenzie',
  templateUrl: './creare-recenzie.component.html',
  styleUrls: ['./creare-recenzie.component.scss']
})
export class CreareRecenzieComponent implements OnInit{
  public sub: Subscription = new Subscription;
  @Input() id: number|undefined;
  email = localStorage.getItem('email');
  public nenulEmail(){ //pentru a transmite email ca string
    if(this.email!=null)
    return this.email;
    else
    return "";
  }
  recenziePunctaj = 0;
  recenzieData = false;

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token !== null) {
      this.validToken(token);
    }


    console.log("id comp",this.id);

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id) {
        this.getRecenzare(this.nenulEmail(),this.id);
      }
    });
  }
  constructor(
    private modalService: NgbModal,
    private service: RecenziiService,
    private route: ActivatedRoute,
    private serviceAuth: AuthentifService,
  ){}

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
  public getRecenzare(email:string,id: number): void {
    this.service.RecenzieDataDejaSpComp(email,id).subscribe(
      (result) => {
        this.recenzieData = result; //se rotunjeste prin majorare
        console.log(this.recenzieData);       
      },
      (error) => {
        console.error(error);
      }
    );
  }


modalAdRecenzie(content: any) {
  this.modalService.open(content, { centered: true });
}

public recenzieAddForm: FormGroup = new FormGroup({
  numarStele : new FormControl(0),
  text: new FormControl(''),
  emailUtilizator: new FormControl(''),
  codCompetitie: new FormControl(0)
});

public saveAdd(): void{
  

  console.log("cod comp",this.id);
  console.log("nr inimi",this.recenziePunctaj);

  this.recenzieAddForm.get('emailUtilizator')?.setValue(this.email);
  this.recenzieAddForm.get('numarStele')?.setValue(this.recenziePunctaj);
  this.recenzieAddForm.get('codCompetitie')?.setValue(this.id);


  this.service.createRecenzie(this.recenzieAddForm.value).subscribe(
    (result) =>{
      console.log(result);
    },
    (error) => {
      console.log(error);
    }
  );

  
  this.modalService.dismissAll();

  location.reload();
}
}
