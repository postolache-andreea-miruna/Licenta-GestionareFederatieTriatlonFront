import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CompetitiiModel } from 'src/app/models/competitiiModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CluburiService } from 'src/app/services/cluburi.service';
import { CompetitiiService } from 'src/app/services/competitii.service';
import { FormulareService } from 'src/app/services/formulare.service';
import { SportiviService } from 'src/app/services/sportivi.service';

@Component({
  selector: 'app-sportiv-by-email',
  templateUrl: './sportiv-by-email.component.html',
  styleUrls: ['./sportiv-by-email.component.scss']
})
export class SportivByEmailComponent implements OnInit{

  hasToken = false;
  logareRol = "";
  logareRol2 = "";
  cluburi:string[]=[];
  isFormComplete = false;

  email = localStorage.getItem('email');

  emailSp = localStorage.getItem('email');

  public nenulEmail(){ //pentru a transmite email ca string
  if(this.email!=null)
  return this.email;
  else
  return "";
}

public competitiileSp: CompetitiiModel[] = [];

  public sub: Subscription = new Subscription;
  public emailul: string | undefined;
  public sportivId = { 
    numarLegitimatie:0,
    urlPozaProfil: 'default poza', 
    nume: 'default nume',
    prenume: 'default prenume',
    gen: 'default gen',
    anNastere: 0,
    abonareStiri:'default stiri',
    numeClub: 'default club',
    emailAntrenor:'default email antrenor',
    numeAntrenor: 'default nume antrenor',
    prenumeAntrenor: 'default prenume antrenor'
  };

  
  public fisaAddForm: FormGroup = new FormGroup({
    pozaDeProfil : new FormControl(''),
    avizMedical: new FormControl(''),
    buletin_CertificatNastere: new FormControl(''),
    numarDeLegitimatie: new FormControl(0)
  });

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };



  public abonareStire:boolean|undefined;


  public sportivEditForm: FormGroup = new FormGroup({
    emailSportiv:new FormControl(''),
    nume:new FormControl(''),
    prenume:new FormControl(''),
    abonareStiri:new FormControl(),
    urlPozaProfil:new FormControl(''),
    numeClub: new FormControl(''),
    antrenorNou: new FormControl(''),
  });

 

  constructor(
    private service: SportiviService,
    private serviceAntr: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceForm: FormulareService,
    private serviceComp: CompetitiiService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private serviceClub: CluburiService

  ) { }

  get pozaDeProfil(): AbstractControl{
    return this.fisaAddForm.get('pozaDeProfil') as AbstractControl;
  }

  get avizMedical(): AbstractControl{
    return this.fisaAddForm.get('avizMedical') as AbstractControl;
  }

  get buletin_CertificatNastere(): AbstractControl{
    return this.fisaAddForm.get('buletin_CertificatNastere') as AbstractControl;
  }

  get numarDeLegitimatie(): AbstractControl{
    return this.fisaAddForm.get('numarDeLegitimatie') as AbstractControl;
  }

  ngOnInit() {
    this.getCluburi();
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }
    if (this.email != null) 
    {
      this.getPoza(this.email);
    }

    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.emailul = params['email'];
      if (this.emailul) {
        this.getSportivId(this.emailul);
      }
    });  

    const oprireCompletare = localStorage.getItem('CompletareOpritaDeLa');
    if(oprireCompletare!=null)
    {const disableUntil = new Date(oprireCompletare);
    if (disableUntil && disableUntil.getTime() >= new Date().getTime()) {
      this.buttonDisabled = true;//buton inactiv
    }
    else{
      const timeUntilEnable = new Date().getTime() - disableUntil.getTime();
    setTimeout(() => {
      this.buttonDisabled = false;
    }, timeUntilEnable);
    }
  }
  this.fisaAddForm.valueChanges.subscribe(() => {
    this.checkFormComplete();
  });

  this.serviceComp.getCompetitiiSportiv(this.nenulEmail()).subscribe(
    (result: CompetitiiModel[]) => {
      console.log(result);
      this.competitiileSp = result;
    },
    (error) => {
      console.error(error);
    }
  );

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


  public editSportivInfo(contentEdit: any){
    this.modalService.open(contentEdit, { centered: true});

    this.sportivEditForm.get('emailSportiv')?.setValue(this.emailul);
    this.sportivEditForm.get('nume')?.setValue(this.sportivId.nume);
    this.sportivEditForm.get('prenume')?.setValue(this.sportivId.prenume);
    this.sportivEditForm.get('abonareStiri')?.setValue(this.abonareStire ? 'true' : 'false');
    
    this.sportivEditForm.get('urlPozaProfil')?.setValue(this.sportivId.urlPozaProfil);

    this.sportivEditForm.get('numeClub')?.setValue(this.sportivId.numeClub);
    this.sportivEditForm.get('antrenorNou')?.setValue(this.sportivId.emailAntrenor);
  }

  public saveUpdateSportiv(): void{
    this.service.updateSportiv(this.sportivEditForm.value).subscribe(
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
        this.sportivEditForm.patchValue({
          urlPozaProfil: reader.result
        });
      };
    }
  }


  public getPoza(email: string): void {
    this.serviceAntr.getUrlUtilizator(email).subscribe(
      (result) => {
        this.pozaProfil = result;
        console.log(this.pozaProfil);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getSportivId(email: string): void {
    this.service.getSportivInfo(email).subscribe(
      (result) => {
        this.sportivId = result;
        console.log(this.sportivId);
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
  public logAntrenor() {
    const rol = localStorage.getItem('RoleId');
    if (rol !== null)
      this.logareRol = rol;

    if (this.logareRol === 'AntrenorUtilizator')
      return true;
    else
      return false;
  }
  public logSportiv() {
    const rol = localStorage.getItem('RoleId');
    if (rol !== null)
      this.logareRol2 = rol;

    if (this.logareRol2 === 'SportivUtilizator')
      return true;
    else
      return false;
  }

  public detaliiAntrenor(emailAntr: string){
    this.router.navigate(['/antr/antrenorIdView',emailAntr]);
  }

  
  public formulare(emailSp: string){
    this.router.navigate(['/form/formular',emailSp]);
  }

  public competitii(emailSp: string){
    this.router.navigate(['/comp/competitii',emailSp]);
  }
public postarileMele(email:string){
  this.router.navigate(['post/postariUtiliz',email]);
}

  public recenzii(email:string){
    this.router.navigate(['rec/recenziiSp',email]);
  }

  afisareForm = false;
  nrClickForm = 0;
  completareForm() {
    if(this.nrClickForm % 2 === 0){
      this.afisareForm = true;
    }
    else{
      this.afisareForm = false;
    }
    this.nrClickForm++;
  }



selectPozaProfil(event:any) {
  if (event.target.files && event.target.files[0] && event.target.files[0] instanceof Blob) {
    const file: Blob = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fisaAddForm.patchValue({
        pozaDeProfil: reader.result
      });
    };
  }
}

selectAviz(event:any) {
  if (event.target.files && event.target.files[0] && event.target.files[0] instanceof Blob) {
    const file: Blob = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fisaAddForm.patchValue({
        avizMedical: reader.result
      });
    };
  }
}


selectBuletinCertificat(event:any) {
  if (event.target.files && event.target.files[0] && event.target.files[0] instanceof Blob) {
    const file: Blob = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fisaAddForm.patchValue({
        buletin_CertificatNastere: reader.result
      });
    };
  }
}

checkFormComplete() {  
  let complete = true;
  if (!this.fisaAddForm.get('pozaDeProfil')?.value ||
      !this.fisaAddForm.get('avizMedical')?.value ||
      !this.fisaAddForm.get('buletin_CertificatNastere')?.value 
      ) {
    complete = false;
  } 
  this.isFormComplete = complete;
}

buttonDisabled = false;

public saveAdd(): void{
  this.fisaAddForm.get('numarDeLegitimatie')?.setValue(this.sportivId.numarLegitimatie); 

  console.log(this.fisaAddForm.value);
  this.serviceForm.createFormular(this.fisaAddForm.value).subscribe(
    (result) =>{
      this.afisareForm = false;
      this.buttonDisabled = true;
      const currentDate = new Date();
      const disableUntil = new Date(currentDate.setMonth(currentDate.getMonth() + 12));
      localStorage.setItem('CompletareOpritaDeLa', disableUntil.toString());
      
      //pentru testare
      //this.buttonDisabled = true;
      //const disableUntil = new Date("2023-04-04 16:30:10.00");
      //localStorage.setItem('CompletareOpritaDeLa', disableUntil.toString());

    },
    (error) => {
      console.log(error);
    }
  );
}

public showBestOf = true;
public showIstoric = false;

public openBestOf(){
  this.showIstoric = false;
  this.showBestOf = true;
}
public openIsto(){
  this.showIstoric = true;
  this.showBestOf = false;
}

}
