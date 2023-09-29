import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SportiviAntrenorModel } from 'src/app/models/sportiviAntrenorModel';
import { AuthentifService } from 'src/app/services/authentif.service';
import { SportiviService } from 'src/app/services/sportivi.service';

@Component({
  selector: 'app-sportivi-club',
  templateUrl: './sportivi-club.component.html',
  styleUrls: ['./sportivi-club.component.scss']
})
export class SportiviClubComponent implements OnInit{
  public sub: Subscription = new Subscription;
  public id: number | undefined;
  hasToken = false;
  public sportiviSearch: SportiviAntrenorModel[] = [];
  constructor(
    private serviceSp:SportiviService,
    private route: ActivatedRoute,
    private router: Router,
    private serviceAuth: AuthentifService,
  ){}
  public sportiviiFilterForm: FormGroup = new FormGroup({
    numeFam: new FormControl(''),
    prenume: new FormControl('')
  });

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
        this.getSportiviSearch(this.id);
      }
    });  

    this.sportiviiFilterForm.valueChanges.subscribe(() => {
      if (this.id !== undefined) {
        //daca val din form e ' ' atunci trimit cu "null" in backend
       
        this.getSportiviSearch(this.id);
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


  public getSportiviSearch(id: number): void {
    
    let numeFam = this.sportiviiFilterForm.get('numeFam')?.value;
    let prenume = this.sportiviiFilterForm.get('prenume')?.value;

    if (numeFam === '') {
      numeFam = "null";
    }
    if (prenume === '') {
      prenume = "null";
    }

    this.serviceSp.getSportiviClubSearch(id,numeFam,prenume).subscribe(
      (result) => {
        this.sportiviSearch = result;
        console.log(this.sportiviSearch);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  goToSportiviDetails(email: string) {
    console.log(email);
    this.router.navigate(['/sp/sportivid', email]);
  }
}
