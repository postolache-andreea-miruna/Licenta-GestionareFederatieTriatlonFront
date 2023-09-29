import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { GenSportiv } from 'src/app/models/genSportiv';
import { SportivDetEmail } from 'src/app/models/sportivDetEmail';
import { AuthentifService } from 'src/app/services/authentif.service';
import { EmailService } from 'src/app/services/email.service';
import { IstoriceService } from 'src/app/services/istorice.service';
import { NotificariService } from 'src/app/services/notificari.service';
import { SportiviService } from 'src/app/services/sportivi.service';

@Component({
  selector: 'app-create-istoric',
  templateUrl: './create-istoric.component.html',
  styleUrls: ['./create-istoric.component.scss']
})
export class CreateIstoricComponent implements OnInit {



  emailul = localStorage.getItem('email');
  public nenulEmail(){ //pentru a transmite email ca string
    if(this.emailul!=null)
    return this.emailul;
    else
    return "";
  } 

  isFormComplete = false;

  public detaliiSpEmail: SportivDetEmail | undefined;

  public anNastere: number | undefined;
  public genSp: GenSportiv | undefined;
  public gen: string | undefined;

  categorieValida = false;
  probaValida = false;

  public intervalEnd: Number | undefined;
  public intervalStart: Number | undefined;
  @Input() id: number | undefined;
  @Input() numeCompetitie: string | undefined;
  ngOnInit(): void {

    console.log(this.id);
    console.log(this.numeCompetitie);

    const token = localStorage.getItem('token');
    if (token !== null) {
      this.validToken(token);
    }
    this.inscriereAddForm.valueChanges.subscribe(() => {
      if(this.genSp !== undefined) {
      this.categOk(this.inscriereAddForm.get('categorie')?.value)}
      this.probaOk(this.inscriereAddForm.get('numeProba')?.value)
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
  onLogout() {
    this.serviceAuth.logout();
   setTimeout(function () {
    window.location.reload();
  }, 1000);
  }

  // const inputStrings = [
    // COPII 5-8 masculin,
    // COPII 9 masculin,
    // COPII 9-10 masculin,
    // COPII 11-13 masculin,
    // CADETI 14-15 masculin,
    // AG 20-24 masculin,
    // AG +65 masculin,
    // UNDER 23 masculin,
    // ELITE masculin,
    // JUNIORI I 18-19 maculin,
    // JUNIORI II 16-17 masculin
  // ];
  schimbareCateg(){
    const categoriaa = this.inscriereAddForm.get('categorie')?.value;
    this.categOk(categoriaa);
  }
  probaOk(proba:string){
    if(proba === "")
      this.probaValida = false;
    const regex = /^(Sprint|Supersprint|Olimpic|Ironman|Half Ironman)/
    const match = regex.test(proba);
    if (match) {
      this.probaValida = true;
    }
    else{
      this.probaValida = false;
    }
    
  }
  categOk(categorie: string) {
    if(categorie === "")
      this.categorieValida = false;
    const regex = /^(UNDER |ELITE|AG \+65|COPII |AG |CADETI |JUNIORI I |JUNIORI II )?(\d+)?(-(\d+))?( MASCULIN| FEMININ)/
    const anCurent = new Date().getFullYear();
    const match = regex.exec(categorie);
    console.log(match);
    if (match) {
      const [, category, start, , end, gen] = match;
      this.intervalStart = Number(start);
      this.intervalEnd = end ? Number(end) : this.intervalStart;
      this.gen = gen;
      if (category === "ELITE") {
        this.intervalStart = 24;
        this.intervalEnd = 102;
      } else if (category === "AG +65") {
        this.intervalStart = 65;
        this.intervalEnd = 102;
      }else if (category === "UNDER ") {
      this.intervalStart = 20;
      this.intervalEnd = 23;
    }
      console.log(`${categorie}: [${this.intervalStart}, ${this.intervalEnd}]`);


      if (this.anNastere !== undefined && this.genSp !== undefined) {


        if (this.intervalStart !== this.intervalEnd) {

          if (((anCurent - this.anNastere) >= this.intervalStart.valueOf()) && ((anCurent - this.anNastere) <= this.intervalEnd.valueOf())) {
            //daca anii sunt incadrati in interval se verifica daca este genul bun
            if(this.genSp.gen === "F" && this.gen === " FEMININ"){
              this.categorieValida = true;
            }
            else if(this.genSp.gen === "M" && this.gen === " MASCULIN"){
              this.categorieValida = true;
            }
            else if(this.genSp.gen === "M" && this.gen !== " MASCULIN"){
              this.categorieValida = false;
            }
            else if(this.genSp.gen === "F" && this.gen !== " FEMININ"){
              this.categorieValida = false;
            }
          }

          else if(((anCurent - this.anNastere) > this.intervalEnd.valueOf()) || ((anCurent - this.anNastere) < this.intervalStart.valueOf())) {
            //daca varsta nu este buna, nu mai verificam genul
            this.categorieValida = false;
          }
        }
        else {
          if ((anCurent - this.anNastere) === this.intervalStart) {
            if(this.genSp.gen === "F" && this.gen === " FEMININ"){
              this.categorieValida = true;
            }
            else if(this.genSp.gen === "M" && this.gen === " MASCULIN"){
              this.categorieValida = true;
            }
            else if(this.genSp.gen === "M" && this.gen !== " MASCULIN"){
              this.categorieValida = false;
            }
            else if(this.genSp.gen === "F" && this.gen !== " FEMININ"){
              this.categorieValida = false;
            }
          }
          else{
            this.categorieValida = false;
          }
        }
      }

    } else {
      console.log(`Nu s-a găsit potrivire: ${categorie}`);
      this.categorieValida = false;
    }

  }

  constructor(
    private modalService: NgbModal,
    private service: IstoriceService,
    private serviceSp: SportiviService,
    private serviceNotif: NotificariService,
    private serviceEmail: EmailService,
    private config: NgbModalConfig,
    private serviceAuth: AuthentifService,
  ) { 
    config.backdrop = 'static';
  config.keyboard = false;
}
  modalAdInscriere(content: any) {
    this.modalService.open(content, { centered: true });
  }

  public inscriereAddForm: FormGroup = new FormGroup({
    numarLegitimatie: new FormControl(),
    numeProba: new FormControl(''),
    numeCompetitie: new FormControl(''),
    categorie: new FormControl(''),
    locPesteToti: new FormControl(999),
    locPerGen: new FormControl(999),
    locPerCategorie: new FormControl(999),
    timpTotal: new FormControl('99:99:99'),
    timpInot: new FormControl('99:99:99'),
    timpCiclism: new FormControl('99:99:99'),
    timpAlergare: new FormControl('99:99:99'),
    timpTranzit1: new FormControl('99:99:99'),
    timpTranzit2: new FormControl('99:99:99'),
    puncte: new FormControl(0),
  });

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


  onLegitimatieChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const legitimatie = inputElement.value;
    const nrLegitimatie = parseInt(legitimatie);
    console.log("nrLegitimatie", nrLegitimatie);
    if (!Number.isNaN(nrLegitimatie)) {
      this.serviceSp.getVarstaSportiv(nrLegitimatie).subscribe(
        (result) => {
          this.anNastere = result;
          console.log(this.anNastere);
        },
        (error) => {
          console.error(error);
        }
      );

      this.serviceSp.getGenSportiv(nrLegitimatie).subscribe(
        (result) => {
          this.genSp = result; 
          console.log(this.genSp);
        },
        (error) => {
          console.error(error);
        }
      );

      this.serviceSp.getSportivDetaliiEmail(nrLegitimatie).subscribe(
        (result) => {
          this.detaliiSpEmail = result;
          console.log(this.detaliiSpEmail);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  checkFormComplete() {  
    let complete = true;
    console.log("nrl",this.inscriereAddForm.get('numarLegitimatie')?.value);
    console.log("nmpb",this.inscriereAddForm.get('numeProba')?.value);
    console.log("cate",this.inscriereAddForm.get('categorie')?.value);
    
    if (this.inscriereAddForm.get('numarLegitimatie')?.value === null||
        this.inscriereAddForm.get('numeProba')?.value === ''||
        this.inscriereAddForm.get('categorie')?.value === '' || 
        this.categorieValida === false ||
        this.probaValida === false
        ) {
      complete = false;
    }
    this.isFormComplete = complete;
  }

  public saveAdd(): void {

    this.inscriereAddForm.get('numeCompetitie')?.setValue(this.numeCompetitie);

    this.service.createIstoric(this.inscriereAddForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );

    this.notificareAddForm.get('mesaj')?.setValue("A fost efectuată înscrierea la proba: "+ this.inscriereAddForm.get('numeProba')?.value + " din cadrul competitiei: " + this.numeCompetitie);
    this.notificareAddForm.get('titluNotificare')?.setValue("Înscriere la competitia " + this.numeCompetitie);
    this.notificareAddForm.get('emailUtilizator')?.setValue(this.emailul);
    this.notificareAddForm.get('numarLegitimatieUtiliz2')?.setValue(this.inscriereAddForm.get('numarLegitimatie')?.value);

    this.serviceNotif.createNotificare(this.notificareAddForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );


   if(this.detaliiSpEmail?.abonareStiri === true){
    this.emailTrimitereForm.get('emailToId')?.setValue(this.detaliiSpEmail?.emailSportiv);
    this.emailTrimitereForm.get('emailToNume')?.setValue(this.detaliiSpEmail?.nume.concat(" " + this.detaliiSpEmail?.prenume));
    this.emailTrimitereForm.get('emailTitlu')?.setValue("Înscriere la competitia " + this.numeCompetitie);
    this.emailTrimitereForm.get('emailContinut')?.setValue("Salutare! \n \n A fost efectuată înscrierea la proba "+ this.inscriereAddForm.get('numeProba')?.value + " din cadrul competitiei " + this.numeCompetitie +". \n \n"+" Te așteptăm cu drag! \n Spor la antrenanemente! \n \n Echipa Triatlon Romania");

    this.serviceEmail.createEmail(this.emailTrimitereForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );}

    this.modalService.dismissAll();

    location.reload();
  }
}
