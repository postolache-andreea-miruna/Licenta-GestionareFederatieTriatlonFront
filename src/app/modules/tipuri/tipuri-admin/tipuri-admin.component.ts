import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipModelTotal } from 'src/app/models/tipModelTotal';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CompetitiiService } from 'src/app/services/competitii.service';
import { TipuriService } from 'src/app/services/tipuri.service';
import { VideoclipuriService } from 'src/app/services/videoclipuri.service';

@Component({
  selector: 'app-tipuri-admin',
  templateUrl: './tipuri-admin.component.html',
  styleUrls: ['./tipuri-admin.component.scss']
})
export class TipuriAdminComponent implements OnInit{
  hasToken = false;
  email = localStorage.getItem('email');
  nrMesajeNecitite = 0;
  isAddFormComplete=false;
  isEditFormComplete = false;
  tipuri:TipModelTotal[]=[];

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };

  public AddTipForm: FormGroup = new FormGroup({
    tipCompetitie: new FormControl(''),
    numarMinimParticipanti: new FormControl(0)
  });
  public EditTipForm: FormGroup = new FormGroup({
    codTip: new FormControl(0),
    numarMinimParticipanti: new FormControl(0)
  });

  constructor(
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceTip: TipuriService,
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
      this.getPoza(this.email);  
      this.getAllTipuri();
      this.AddTipForm.valueChanges.subscribe(() => {
        this.checkAddFormComplete();
      });
      this.EditTipForm.valueChanges.subscribe(() => {
        this.checkEditFormComplete();
      });
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

  getAllTipuri(){
    this.serviceTip.GetTipuriTotal().subscribe(
      (result)=>{
        this.tipuri = result;
      },
      (error)=>{
        console.error(error);
      }
    );
  }
  checkEditFormComplete() {  
    let complete = true;
    if (!this.EditTipForm.get('numarMinimParticipanti')?.value 
        ) {
      complete = false;
    } 
    this.isEditFormComplete = complete;
  }
  checkAddFormComplete() {  
    let complete = true;
    if (!this.AddTipForm.get('numarMinimParticipanti')?.value ||
        !this.AddTipForm.get('tipCompetitie')?.value
        ) {
      complete = false;
    } 
    this.isAddFormComplete = complete;
  }
  modalAdTip(content: any) {
    this.modalService.open(content, { centered: true });
  }
  public saveAdd(): void{
    this.serviceTip.createTip(this.AddTipForm.value).subscribe(
      (result) =>{
        console.log(result);
        
    this.modalService.dismissAll();
    location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editForm(content:any,codTip:number,numarMinimParticipanti:number){
    this.modalService.open(content, { centered: true });
    this.EditTipForm.get('codTip')?.setValue(codTip);
    this.EditTipForm.get('numarMinimParticipanti')?.setValue(numarMinimParticipanti);
  }

  saveUpdateTip(){
    this.serviceTip.updateTip(this.EditTipForm.value).subscribe(
      (result) =>{
        this.modalService.dismissAll();
        location.reload();
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
