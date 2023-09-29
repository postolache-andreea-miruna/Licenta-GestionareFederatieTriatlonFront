import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularModelTotal } from 'src/app/models/formularModelTotal';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CompetitiiService } from 'src/app/services/competitii.service';
import { FormulareService } from 'src/app/services/formulare.service';
import { VideoclipuriService } from 'src/app/services/videoclipuri.service';

@Component({
  selector: 'app-formulare-admin',
  templateUrl: './formulare-admin.component.html',
  styleUrls: ['./formulare-admin.component.scss']
})
export class FormulareAdminComponent implements OnInit{
  formulare:FormularModelTotal[]=[];
  hasToken = false;
  email = localStorage.getItem('email');
  constructor(
    private service: AntrenoriService,
    private serviceComp: CompetitiiService,
    private serviceAuth: AuthentifService,
    private serviceForm: FormulareService,
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
      this.getFormulare();
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


  public anFilterForm: FormGroup = new FormGroup({
    an: new FormControl('toti anii')
  });
  public getFormulare(): void {

    const an = this.anFilterForm.get('an')?.value;
    this.serviceForm.GetAllFormulare(an).subscribe(
      (result) => {
        this.formulare = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  filtreza(){
    this.getFormulare();
  }
  onLogout() {
    this.serviceAuth.logoutAdmin();
   setTimeout(function () {
    window.location.reload();
  }, 1000);
  }
}
