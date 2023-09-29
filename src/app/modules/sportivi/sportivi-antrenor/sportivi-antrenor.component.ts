import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SportiviAntrenorModel } from 'src/app/models/sportiviAntrenorModel';
import { AuthentifService } from 'src/app/services/authentif.service';
import { SportiviService } from 'src/app/services/sportivi.service';

@Component({
  selector: 'app-sportivi-antrenor',
  templateUrl: './sportivi-antrenor.component.html',
  styleUrls: ['./sportivi-antrenor.component.scss']
})
export class SportiviAntrenorComponent implements OnInit{
  public sportivi: SportiviAntrenorModel[] = [];
  public sportiviFilter: SportiviAntrenorModel[] = [];
  public sub: Subscription = new Subscription;
  public email: string | undefined;

  hasToken = false;
  logareRol="";

  constructor(
    private service: SportiviService,
    private route: ActivatedRoute,
    private router: Router,
    private serviceAuth: AuthentifService,

  ) { }

  public logAntrenor(){
    const rol = localStorage.getItem('RoleId');
    if(rol !== null)
      this.logareRol = rol;
      
    if(this.logareRol === 'AntrenorUtilizator') 
      return true;
      else
      return false;
  }


  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token!==null) {
      this.hasToken = true;
      this.validToken(token);
    }

    this.sub = this.route.params.subscribe(params => {
      this.email = params['email'];
      console.log(this.email);
      if (this.email) {
        this.getSportiviByEmailAntrenor(this.email);
        this.getSportiviFilterByEmailAntrenor(this.email);
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

  public getSportiviByEmailAntrenor(email: string): void {
    this.service.getSportiviForAntrenor(email).subscribe(
      (result) => {
        this.sportivi = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public sportiviFilterForm: FormGroup = new FormGroup({
    gen : new FormControl('toate genurile'),
    anNastere: new FormControl('toti anii')
  });

  public getSportiviFilterByEmailAntrenor(email: string): void {
    const genul = this.sportiviFilterForm.get('gen')?.value;
    console.log("GEN",genul);
    const anNastere = this.sportiviFilterForm.get('anNastere')?.value;
    this.service.getSportiviFilterForAntrenor(email,genul,anNastere).subscribe(
      (result) => {
        this.sportiviFilter = result;
        console.log("FILTRATI");
        console.log("FILTRATI",this.sportiviFilter);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  goToSportivDetails(emailSportiv: string) {
    this.router.navigate(['/sp/sportivid', emailSportiv]);
  }
  emailul = localStorage.getItem('email');
  public nenulEmail(){ //pentru a transmite email ca string
    if(this.emailul!=null)
    return this.emailul;
    else
    return "";
  }
  filtreza(){
    this.getSportiviFilterByEmailAntrenor(this.nenulEmail());
  }

}
