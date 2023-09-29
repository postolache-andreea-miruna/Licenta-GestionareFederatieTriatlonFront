import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SportiviAntrenorModel } from 'src/app/models/sportiviAntrenorModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CluburiService } from 'src/app/services/cluburi.service';
import { SportiviService } from 'src/app/services/sportivi.service';

@Component({
  selector: 'app-antrenor-by-email',
  templateUrl: './antrenor-by-email.component.html',
  styleUrls: ['./antrenor-by-email.component.scss']
})
export class AntrenorByEmailComponent implements OnInit{
  hasToken = false;
  logareRol = "";
  numarSportivi = 0;
  email = localStorage.getItem('email');


  public sportivi: SportiviAntrenorModel[]=[];

  public cluburi: string[]=[];

  public sub: Subscription = new Subscription;
  public emailul: string | undefined;
  public antrenorId = { 
    nume: 'default nume',
    prenume: 'default prenume',
    gradPregatire: 'default pregatire',
    abonareStiri: 'default abonare',
    urlPozaProfil: 'default poza', 
    numeClub: 'default club',
    email: 'default email',
  };

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };

  public abonareStire:boolean|undefined;


  public antrenorEditForm: FormGroup = new FormGroup({
    emailAntrenor:new FormControl(''),
    abonareStiri:new FormControl(),
    gradPregatire:new FormControl(''),
    nume:new FormControl(''),
    numeClub:new FormControl(''),
    prenume:new FormControl(''),
    urlPozaProfil:new FormControl(''),
  });

  public editAntrenorInfo(contentEdit: any){
    this.modalService.open(contentEdit, { centered: true});

    this.antrenorEditForm.get('emailAntrenor')?.setValue(this.emailul);
    this.antrenorEditForm.get('abonareStiri')?.setValue(this.abonareStire ? 'true' : 'false');
    this.antrenorEditForm.get('gradPregatire')?.setValue(this.antrenorId.gradPregatire);
    this.antrenorEditForm.get('nume')?.setValue(this.antrenorId.nume);
    this.antrenorEditForm.get('numeClub')?.setValue(this.antrenorId.numeClub);
    this.antrenorEditForm.get('prenume')?.setValue(this.antrenorId.prenume);
    this.antrenorEditForm.get('urlPozaProfil')?.setValue(this.antrenorId.urlPozaProfil);
  }

  public saveUpdateAntrentor(): void{
    this.service.updateAntrenor(this.antrenorEditForm.value).subscribe(
      (result) =>{
        console.log("rez",result);
        this.modalService.dismissAll();
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFileSelected(event:any) {
    if (event.target.files && event.target.files[0] && event.target.files[0] instanceof Blob) {
      const file: Blob = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.antrenorEditForm.patchValue({
          urlPozaProfil: reader.result
        });
      };
    }
  }

  constructor(
    private service: AntrenoriService,
    private serviceAuth:AuthentifService,
    private route: ActivatedRoute,
    private serviceSp: SportiviService,
    private serviceClub: CluburiService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }
    this.getCluburi();
    if (this.email != null) //emailul celui logat
    {
      this.getPoza(this.email);
    }

    this.sub = this.route.params.subscribe(params => {
      this.emailul = params['email'];
      if (this.emailul) {
        this.getAntrenorId(this.emailul);
        this.getSportiviByEmailAntrenor(this.emailul);
        this.getAbonareStiri(this.emailul);
        this.getNrSportivi(this.emailul);
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
  public getNrSportivi(email:string):void{
    this.service.getNrSportivi(email).subscribe(
      (result) => {
        this.numarSportivi = result;
        console.log("nrSp",this.numarSportivi);
      },
      (error) => {
        console.error(error);
      }
    );
  }
public getCluburi():void{
  this.serviceClub.getNumeCluburi().subscribe(
    (result) => {
      this.cluburi = result;
      console.log("cluburi",this.cluburi);
    },
    (error) => {
      console.error(error);
    }
  );
}
  public getAbonareStiri(email: string): void {
    this.service.getAbonareUtilizator(email).subscribe(
      (result) => {
        this.abonareStire = result;
        console.log("abonare",this.abonareStire);
      },
      (error) => {
        console.error(error);
      }
    );
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

  public getAntrenorId(email: string): void {
    this.service.getAntrenorInfo(email).subscribe(
      (result) => {
        this.antrenorId = result;
        console.log(this.antrenorId);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getSportiviByEmailAntrenor(email: string): void {
    this.serviceSp.getSportiviForAntrenor(email).subscribe(
      (result) => {
        this.sportivi = result;
        console.log(this.sportivi);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public logAntrenor() {
    const rol = localStorage.getItem('RoleId');
    if (rol !== null)
      this.logareRol = rol;

    if (this.logareRol === 'AntrenorUtilizator')
      return true;
    else
      return false;
  }

  afisareSportiviAntr = false;
  afisareStatistici = false;


  sportiviAntr(){
    this.afisareSportiviAntr = true;
    this.afisareStatistici =false
  }

  statistici(){
this.afisareStatistici=true;
this.afisareSportiviAntr = false;
  }

  public postarileMele(){
    this.router.navigate(['post/postariUtiliz',this.email]);
  }
}
