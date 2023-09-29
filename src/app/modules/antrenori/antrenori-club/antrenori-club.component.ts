import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AntrenoriClubModel } from 'src/app/models/antrenoriClubModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';

@Component({
  selector: 'app-antrenori-club',
  templateUrl: './antrenori-club.component.html',
  styleUrls: ['./antrenori-club.component.scss']
})
export class AntrenoriClubComponent implements OnInit {
  public sub: Subscription = new Subscription;
  public id: number | undefined;
  public antrenoriSearch: AntrenoriClubModel[] = [];
  constructor(
    private serviceAntr: AntrenoriService,
    private route: ActivatedRoute,
    private router: Router,
    private serviceAuth: AuthentifService,
  ) { }


  public antrenoriFilterForm: FormGroup = new FormGroup({
    numeFam: new FormControl(''),
    prenume: new FormControl('')
  });
  hasToken=false;
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      if (this.id) {
        this.getAntrenoriSearch(this.id);
      }
    });


    this.antrenoriFilterForm.valueChanges.subscribe(() => {
      if (this.id !== undefined) {       
        this.getAntrenoriSearch(this.id);
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

  public getAntrenoriSearch(id: number): void {
    let numeFam = this.antrenoriFilterForm.get('numeFam')?.value;
    let prenume = this.antrenoriFilterForm.get('prenume')?.value;

    if (numeFam === '') {
      numeFam = "null";
    }
    if (prenume === '') {
      prenume = "null";
    }

    this.serviceAntr.getAntrenoriClubSearch(id, numeFam, prenume).subscribe(
      (result) => {
        this.antrenoriSearch = result;
        console.log(this.antrenoriSearch);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToAntrenorDetails(email: string) {
    this.router.navigate(['/antr/antrenorIdView', email]);
  }
}
