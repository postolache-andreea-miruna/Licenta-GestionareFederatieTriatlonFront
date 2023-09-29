import { ResourceLoader, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HubConnection } from '@microsoft/signalr';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CompetitiiTotalModel } from 'src/app/models/competitiiTotalModel';
import { DetaliiTrimitereEmail } from 'src/app/models/detaliiTrimitereEmail';
import { LocatieModel } from 'src/app/models/locatieModel';
import { TipModelCodNume } from 'src/app/models/tipModelCodNume';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CluburiService } from 'src/app/services/cluburi.service';
import { CompetitiiService } from 'src/app/services/competitii.service';
import { EmailService } from 'src/app/services/email.service';
import { LocatiiService } from 'src/app/services/locatii.service';
import { NotificariService } from 'src/app/services/notificari.service';
import { TipuriService } from 'src/app/services/tipuri.service';

@Component({
  selector: 'app-competitie-admin',
  templateUrl: './competitie-admin.component.html',
  styleUrls: ['./competitie-admin.component.scss']
})
export class CompetitieAdminComponent implements OnInit {


  antrenori:DetaliiTrimitereEmail[]=[];

  tipuriNumeCod: TipModelCodNume[] = [];
  competitii: CompetitiiTotalModel[] = [];
  locatii: LocatieModel[] = [];
  hasToken = false;
  isFormComplete = false;
  isEditFormComplete = false;
  isFormLocatieComplete = false;
  isEditLocatieFormComplete = false;
  email = localStorage.getItem('email');
  public pozaProfil = {
    urlPozaProfil: 'default poza',
  };

  public notificareAddForm: FormGroup = new FormGroup({
    mesaj: new FormControl(''),
    titluNotificare: new FormControl(''),
    emailUtilizator: new FormControl(''),
    numarLegitimatieUtiliz2: new FormControl()
  });
  public emailTrimitereForm: FormGroup = new FormGroup({
    emailToId:new FormControl(''),
    emailToNume:new FormControl(''),
    emailTitlu: new FormControl(''),
    emailContinut:new FormControl(''),
  });



  public AddCompetitieForm: FormGroup = new FormGroup({
    numeCompetitie: new FormControl(''),
    taxaParticipare: new FormControl(0.0),
    dataStart: new FormControl('2012-03-26T00:00:00'),
    dataFinal: new FormControl('2012-03-26T00:00:00'),
    paginaOficialaCompetitie: new FormControl(''),
    statusCompetitie: new FormControl('activa'),
    codTip: new FormControl(0),
    codLocatie: new FormControl(0),
  });

  public AddLocatieForm: FormGroup = new FormGroup({
    tara: new FormControl(''),
    oras: new FormControl(''),
    strada: new FormControl(''),
    numarStrada: new FormControl(0),
    detaliiSuplimentare: new FormControl(''),
  });

  public EditLocatieForm: FormGroup = new FormGroup({
    codLocatie:new FormControl(0),
    tara: new FormControl(''),
    oras: new FormControl(''),
    strada: new FormControl(''),
    numarStrada: new FormControl(0),
    detaliiSuplimentare: new FormControl(''),
  });

  public EditCompetitieForm: FormGroup = new FormGroup({
    codCompetitie: new FormControl(0),
    numeCompetitie: new FormControl(''),
    taxaParticipare: new FormControl(0.0),
    dataStart: new FormControl('2012-03-26T00:00:00'),
    dataFinal: new FormControl('2012-03-26T00:00:00'),
    paginaOficialaCompetitie: new FormControl(''),
    statusCompetitie: new FormControl(''),
    codLocatie: new FormControl(0),
  });

  timeStart: NgbTimeStruct = { hour: 10, minute: 30, second: 30 };
  timeFinal: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  dataStart: NgbDateStruct = {
    "year": 2023,
    "month": 5,
    "day": 18
  };
  dataFinal: NgbDateStruct = {
    "year": 2023,
    "month": 5,
    "day": 18
  };


  constructor(
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceCompetitie: CompetitiiService,
    private serviceTip: TipuriService,
    private serviceLocatie: LocatiiService,
    private serviceNotif:NotificariService,
    private serviceAntrenor:AntrenoriService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private serviceEmail: EmailService
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }
    if (this.email != null) {
      this.getPoza(this.email);
      this.getTipuriNumeCod();
      this.getAllCompetitii();
      this.getAllLocatii();
      this.getAllAntrenori();
    }
    this.AddCompetitieForm.valueChanges.subscribe(() => {
      this.checkFormComplete();
    });
    this.AddLocatieForm.valueChanges.subscribe(() => {
      this.checkFormLocatieComplete();
    });
    this.EditLocatieForm.valueChanges.subscribe(() => {
      this.checkEditLocatieFormComplete();
    });
    this.EditCompetitieForm.valueChanges.subscribe(() => {
      this.checkEditFormComplete();
      console.log("data", this.EditCompetitieForm.value);
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
  public getAllAntrenori(){
    this.serviceAntrenor.getDetaliiEmailAntrenor().subscribe(
      (result) => {
        this.antrenori = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getAllLocatii() {
    this.serviceLocatie.GetLocatii().subscribe(
      (result) => {
        this.locatii = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public getAllCompetitii() {
    this.serviceCompetitie.getCompetitiiTotal().subscribe(
      (result) => {
        this.competitii = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public getTipuriNumeCod() {
    this.serviceTip.GetTipuriIdNume().subscribe(
      (result) => {
        this.tipuriNumeCod = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }



  checkEditFormComplete() {
    let complete = true;
    if (!this.EditCompetitieForm.get('numeCompetitie')?.value ||
      !this.EditCompetitieForm.get('taxaParticipare')?.value ||
      !this.EditCompetitieForm.get('statusCompetitie')?.value ||
      !this.EditCompetitieForm.get('codLocatie')?.value
    ) {
      complete = false;
    }
    this.isEditFormComplete = complete;
    
  }
  checkEditLocatieFormComplete() {
    let complete = true;
    if (!this.EditLocatieForm.get('tara')?.value ||
      !this.EditLocatieForm.get('oras')?.value
    ) {
      complete = false;
    }
    this.isEditLocatieFormComplete = complete;
  }
  checkFormComplete() {
    let complete = true;
    if (!this.AddCompetitieForm.get('numeCompetitie')?.value ||
      !this.AddCompetitieForm.get('taxaParticipare')?.value ||
      !this.AddCompetitieForm.get('statusCompetitie')?.value ||
      !this.AddCompetitieForm.get('codTip')?.value ||
      !this.AddCompetitieForm.get('codLocatie')?.value
    ) {
      complete = false;
    }
    this.isFormComplete = complete;
  }

  checkFormLocatieComplete() {
    let complete = true;
    if (!this.AddLocatieForm.get('tara')?.value ||
      !this.AddLocatieForm.get('oras')?.value
    ) {
      complete = false;
    }
    this.isFormLocatieComplete = complete;
  }

  modalAdCompetitie(content: any) {
    this.modalService.open(content, { centered: true });
  }
  modalAdLocatie(content: any) {
    this.modalService.open(content, { centered: true });
  }

  public saveAddComp(): void {

    const utcTimestampStart = Date.UTC(this.dataStart.year, this.dataStart.month - 1, this.dataStart.day, this.timeStart.hour, this.timeStart.minute, this.timeStart.second);
    const utcTimestampFinal = Date.UTC(this.dataFinal.year, this.dataFinal.month - 1, this.dataFinal.day, this.timeFinal.hour, this.timeFinal.minute, this.timeFinal.second);

    const dateStart = new Date(utcTimestampStart);
    const dateFinal = new Date(utcTimestampFinal);

    this.AddCompetitieForm.get('dataStart')?.setValue(dateStart);
    this.AddCompetitieForm.get('dataFinal')?.setValue(dateFinal);

    this.serviceCompetitie.createCompetitie(this.AddCompetitieForm.value).subscribe(
      (result) => {
        console.log(result);

        this.modalService.dismissAll();
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );

    for (let i = 0; i < this.antrenori.length; i++) {
      if (this.antrenori[i].abonareStiri === true) {
        this.emailTrimitereForm.get('emailToId')?.setValue(this.antrenori[i].email);
        this.emailTrimitereForm.get('emailToNume')?.setValue(this.antrenori[i].nume.concat(" " + this.antrenori[i].prenume));
        this.emailTrimitereForm.get('emailTitlu')?.setValue("Competitie Nouă");
        this.emailTrimitereForm.get('emailContinut')?.setValue("Salutare! \n \n A fost introdusă o nouă competiție în calendarul competițional. Este vorba despre " + this.AddCompetitieForm.get('numeCompetitie')?.value + ". \n \n Echipa Triatlon Romania");
        this.serviceEmail.createEmail(this.emailTrimitereForm.value).subscribe(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }

  }

  public saveAddLocatie(): void {

    this.serviceLocatie.createLocatie(this.AddLocatieForm.value).subscribe(
      (result) => {
        console.log(result);

        this.modalService.dismissAll();
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  timeEStart: NgbTimeStruct = { hour: 10, minute: 30, second: 30 };
  timeEFinal: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  dataEStart: NgbDateStruct = {
    "year": 2023,
    "month": 5,
    "day": 18
  };
  dataEFinal: NgbDateStruct = {
    "year": 2023,
    "month": 5,
    "day": 18
  };

  editCompetitieForm(contentEdit: any, codCompetitie: number, numeCompetitie: string, taxaParticipare: number, dataStart: Date, dataFinal: Date, paginaOficialaCompetitie: string, statusCompetitie: string, codLocatie: number) {

    console.log("dataFfinal", dataFinal);

    const dataS = new Date(dataStart);
    const dataF = new Date(dataFinal);
    const anS = dataS.getFullYear();
    const lunaS = dataS.getMonth() + 1;
    const ziS = dataS.getDate();
    const oraS = dataS.getHours();
    const minuteS = dataS.getMinutes();
    const secundeS = dataS.getSeconds();


    const anF = dataF.getFullYear();
    const lunaF = dataF.getMonth() + 1;
    const ziF = dataF.getDate();
    const oraF = dataF.getHours();
    const minuteF = dataF.getMinutes();
    const secundeF = dataF.getSeconds();

    this.timeEFinal.hour = oraF;
    this.timeEFinal.minute = minuteF;
    this.timeEFinal.second = secundeF;
    this.timeEStart.hour = oraS;
    this.timeEStart.minute = minuteS;
    this.timeEStart.second = secundeS;

    this.dataEStart.year = anS;
    this.dataEStart.month = lunaS;
    this.dataEStart.day = ziS;

    this.dataEFinal.year = anF;
    this.dataEFinal.month = lunaF;
    this.dataEFinal.day = ziF;
    this.modalService.open(contentEdit, { centered: true });


    console.log("data", dataFinal);
    this.EditCompetitieForm.get('codCompetitie')?.setValue(codCompetitie);
    this.EditCompetitieForm.get('numeCompetitie')?.setValue(numeCompetitie);
    this.EditCompetitieForm.get('taxaParticipare')?.setValue(taxaParticipare);
    this.EditCompetitieForm.get('dataStart')?.setValue(dataStart);
    this.EditCompetitieForm.get('dataFinal')?.setValue(dataFinal);
    this.EditCompetitieForm.get('paginaOficialaCompetitie')?.setValue(paginaOficialaCompetitie);
    this.EditCompetitieForm.get('statusCompetitie')?.setValue(statusCompetitie);
    this.EditCompetitieForm.get('codLocatie')?.setValue(codLocatie);
  }


  saveUpdateCompetitie() {
    console.log("data", this.EditCompetitieForm.get('dataStart')?.value);
    this.serviceCompetitie.updateCompetitie(this.EditCompetitieForm.value).subscribe(
      (result) => {
        this.modalService.dismissAll();
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editLocatieForm(contentEdit: any, codLocatie:number,tara:string,oras:string,strada:string,numarStrada:number,detaliiSuplimentare:string){
    this.modalService.open(contentEdit, { centered: true });
    this.EditLocatieForm.get('codLocatie')?.setValue(codLocatie);
    this.EditLocatieForm.get('tara')?.setValue(tara);
    this.EditLocatieForm.get('oras')?.setValue(oras);
    this.EditLocatieForm.get('strada')?.setValue(strada);
    this.EditLocatieForm.get('numarStrada')?.setValue(numarStrada);
    this.EditLocatieForm.get('detaliiSuplimentare')?.setValue(detaliiSuplimentare);
  }
  saveUpdateLocatie() {
    this.serviceLocatie.updateLocatie(this.EditLocatieForm.value).subscribe(
      (result) => {
        this.modalService.dismissAll();
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteLocatie(codLocatie:number){
    this.serviceLocatie.deleteLocatie(codLocatie).subscribe(
      (result) => {
        this.modalService.dismissAll();
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public goToCompetitieId(codCompetitie:number){
    this.router.navigate(['comp/admin',codCompetitie]);
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
