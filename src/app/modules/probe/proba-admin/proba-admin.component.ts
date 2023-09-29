import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ProbaModelTotal } from 'src/app/models/probaModelTotal';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CluburiService } from 'src/app/services/cluburi.service';
import { ProbeService } from 'src/app/services/probe.service';

@Component({
  selector: 'app-proba-admin',
  templateUrl: './proba-admin.component.html',
  styleUrls: ['./proba-admin.component.scss']
})
export class ProbaAdminComponent implements OnInit{
  hasToken = false;
  time: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  isFormComplete = false;
  email = localStorage.getItem('email');
  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };
  probe:ProbaModelTotal[]=[];
  public AddProbaForm: FormGroup = new FormGroup({
    numeProba: new FormControl(''),
    timpLimita: new FormControl(''),
    detaliiDistante: new FormControl('')
  });

  public EditProbaForm: FormGroup = new FormGroup({
    codProba: new FormControl(0),
    timpLimita: new FormControl(''),
  });

  constructor(
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceProba: ProbeService,
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
      this.getAllProbe();   
    }
    this.AddProbaForm.valueChanges.subscribe(() => {
      this.checkFormComplete();
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

  checkFormComplete() {  
    let complete = true;
    if (!this.AddProbaForm.get('numeProba')?.value ||
        !this.AddProbaForm.get('detaliiDistante')?.value
        ) {
      complete = false;
    } 
    this.isFormComplete = complete;
  }
  modalAdProba(content: any) {
    this.modalService.open(content, { centered: true });
  }

  public saveAdd(): void{
    const timeValue = this.time.hour+':'+this.time.minute+':'+this.time.second;
    this.AddProbaForm.get('timpLimita')?.setValue(timeValue);
      this.serviceProba.createProba(this.AddProbaForm.value).subscribe(
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

  editForm(content:any,codProba:number,timpLimita:string){
    this.modalService.open(content, { centered: true });
const timpSplit = timpLimita.split(':');

const timpul: NgbTimeStruct = {
  hour: parseInt(timpSplit[0]),
  minute: parseInt(timpSplit[1]),
  second: parseInt(timpSplit[2])
};

    this.EditProbaForm.get('codProba')?.setValue(codProba);
    this.time.hour = timpul.hour;
    this.time.minute = timpul.minute;
    this.time.second = timpul.second;
    this.EditProbaForm.get('timpLimita')?.setValue(this.time.hour+':'+this.time.minute+':'+this.time.second);
  }

  saveUpdateProba(){
    const timeValue = this.time.hour+':'+this.time.minute+':'+this.time.second;
    this.EditProbaForm.get('timpLimita')?.setValue(timeValue);
    this.serviceProba.updateProba(this.EditProbaForm.value).subscribe(
      (result) =>{
        this.modalService.dismissAll();
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  public getAllProbe(){
    this.serviceProba.getProbeTotal().subscribe(
      (result) => {
        this.probe = result;
      },
      (error) => {
        console.error(error);
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
