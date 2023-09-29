import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Online } from 'src/app/models/online';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CompetitiiService } from 'src/app/services/competitii.service';
import { IstoriceService } from 'src/app/services/istorice.service';
import { LocatiiService } from 'src/app/services/locatii.service';
import { TipuriService } from 'src/app/services/tipuri.service';
import { CreateIstoricComponent } from '../../istorice/create-istoric/create-istoric.component';
import { IstoricCreateModel } from 'src/app/models/istoricCreateModel';
import { FormGroup, FormControl } from '@angular/forms';
import { CompetitiiNumeModel } from 'src/app/models/competitiiNumeModel';

@Component({
  selector: 'app-competitie-id-admin',
  templateUrl: './competitie-id-admin.component.html',
  styleUrls: ['./competitie-id-admin.component.scss']
})
export class CompetitieIdAdminComponent implements OnInit{
  hasToken = false;
  numeComp="";
  email = localStorage.getItem('email');
  public pozaProfil = {
    urlPozaProfil: 'default poza',
  };
  isEditFormComplete=false;

  istoriceComp:IstoricCreateModel[]=[];
  public sub: Subscription = new Subscription;
  public id: number | undefined;


  public EditIstoricForm: FormGroup = new FormGroup({
    numarLegitimatie: new FormControl(0),
    numeProba: new FormControl(''),
    numeCompetitie: new FormControl(''),
    categorie: new FormControl(''),
    locPesteToti: new FormControl(0),
    locPerGen: new FormControl(0),
    locPerCategorie: new FormControl(0),
    timpTotal: new FormControl(''),
    timpInot: new FormControl(''),
    timpCiclism: new FormControl(''),
    timpAlergare: new FormControl(''),
    timpTranzit1: new FormControl(''),
    timpTranzit2: new FormControl(''),
    puncte: new FormControl(0),
  });

  constructor(
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceIstoric:IstoriceService,
    private serviceComp:CompetitiiService,
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
    if (this.email != null) {
      this.getPoza(this.email);

      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
        console.log(this.id);
        if (this.id) {
          this.getAllIstoriceCompId(this.id);
          this.getNumeComp(this.id);
        }
      });  
    }
    
    this.EditIstoricForm.valueChanges.subscribe(() => {
      this.checkEditFormComplete();
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

getNumeComp(id:number){
  console.log("id",id);
  this.serviceComp.getNumeCompetitieId(id).subscribe(
    (result)=>{
      console.log("numeComp",this.numeComp);
      this.numeComp = result.numeCompetitie;
    }
  )
}
  checkEditFormComplete() {
    let complete = true;
    if (!this.EditIstoricForm.get('categorie')?.value ||
    !this.EditIstoricForm.get('locPesteToti')?.value ||
    !this.EditIstoricForm.get('locPerGen')?.value ||
    !this.EditIstoricForm.get('locPerCategorie')?.value ||
    !this.EditIstoricForm.get('timpTotal')?.value ||
    !this.EditIstoricForm.get('timpInot')?.value ||
    !this.EditIstoricForm.get('timpCiclism')?.value ||
    !this.EditIstoricForm.get('timpAlergare')?.value ||
    !this.EditIstoricForm.get('timpTranzit1')?.value ||
    !this.EditIstoricForm.get('timpTranzit2')?.value ||
    !this.EditIstoricForm.get('puncte')?.value 
    ) {
      complete = false;
    }
    this.isEditFormComplete = complete;
  }


  editIstoricForm(contentEdit: any,numarLegitimatie:number,numeProba:string,numeCompetitie:string,categorie:string,
    locPesteToti:number,locPerGen:number,locPerCategorie:number,timpTotal:string,timpInot:string,timpCiclism:string,
    timpAlergare:string,timpTranzit1:string,timpTranzit2:string,puncte:number){
    
      this.EditIstoricForm.get('numarLegitimatie')?.setValue(numarLegitimatie);
      this.EditIstoricForm.get('numeProba')?.setValue(numeProba);
      this.EditIstoricForm.get('numeCompetitie')?.setValue(numeCompetitie);
      this.EditIstoricForm.get('categorie')?.setValue(categorie);
      this.EditIstoricForm.get('locPesteToti')?.setValue(locPesteToti);
      this.EditIstoricForm.get('locPerGen')?.setValue(locPerGen);
      this.EditIstoricForm.get('locPerCategorie')?.setValue(locPerCategorie);
      this.EditIstoricForm.get('timpTotal')?.setValue(timpTotal);
      this.EditIstoricForm.get('timpInot')?.setValue(timpInot);
      this.EditIstoricForm.get('timpCiclism')?.setValue(timpCiclism);
      this.EditIstoricForm.get('timpAlergare')?.setValue(timpAlergare);
      this.EditIstoricForm.get('timpTranzit1')?.setValue(timpTranzit1);
      this.EditIstoricForm.get('timpTranzit2')?.setValue(timpTranzit2);
      this.EditIstoricForm.get('puncte')?.setValue(puncte);
      this.modalService.open(contentEdit, { centered: true });

  }
  saveUpdateIstoric() {
    this.serviceIstoric.updateIstoric(this.EditIstoricForm.value).subscribe(
      (result) => {
        this.modalService.dismissAll();
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

public getAllIstoriceCompId(id:number){
this.serviceIstoric.GetAllIstoriceCompId(id).subscribe(
  (result)=>{
    this.istoriceComp = result;
  },
  (error)=>{
    console.error(error);
  }
)
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
