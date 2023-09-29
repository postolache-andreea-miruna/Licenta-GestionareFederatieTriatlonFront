import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CompetitieNumeIdModel } from 'src/app/models/competitieNumeIdModel';
import { VideoModel } from 'src/app/models/videoModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { ChatService } from 'src/app/services/chat.service';
import { CompetitiiService } from 'src/app/services/competitii.service';
import { VideoclipuriService } from 'src/app/services/videoclipuri.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  isAddFormComplete = false;
  isEditFormComplete = false;
  numeIdComp: CompetitieNumeIdModel[]=[];
  videoclipuri: VideoModel[]=[];

  hasToken = false;
  email = localStorage.getItem('email');
  nrMesajeNecitite = 0;

  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };
  public sub: Subscription = new Subscription;
  public id: Number | undefined;


  public AddVideoForm: FormGroup = new FormGroup({
    urlVideo: new FormControl(''),
    codYoutubeVideo: new FormControl(''),
    codCompetitie: new FormControl(0)
  });

  public EditVideoForm: FormGroup = new FormGroup({
    codVideo: new FormControl(0),
    urlVideo: new FormControl(''),
    codYoutubeVideo: new FormControl('')
  });

  constructor(
    private service: AntrenoriService,
    private serviceComp: CompetitiiService,
    private serviceAuth: AuthentifService,
    private serviceVideo: VideoclipuriService,
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
      this.getNumeCompId();
      this.getAllVideoclipuri();
      this.AddVideoForm.valueChanges.subscribe(() => {
        this.checkAddFormComplete();
      });
      this.EditVideoForm.valueChanges.subscribe(() => {
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
  public getAllVideoclipuri():void{
    this.serviceVideo.GetVideoclipuri().subscribe(
      (result) =>
      {
        this.videoclipuri = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getNumeCompId():void{
    this.serviceComp.getCompetitiiNumeId().subscribe(
      (result) =>
      {
        this.numeIdComp = result;
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



  modalAdVideo(content: any) {
    this.modalService.open(content, { centered: true });
  }

  checkAddFormComplete() {  
    let complete = true;
    if (!this.AddVideoForm.get('urlVideo')?.value ||
        !this.AddVideoForm.get('codYoutubeVideo')?.value ||
        !this.AddVideoForm.get('codCompetitie')?.value 
        ) {
      complete = false;
    } 
    this.isAddFormComplete = complete;
  }

  checkEditFormComplete() {  
    let complete = true;
    if (!this.EditVideoForm.get('urlVideo')?.value ||
        !this.EditVideoForm.get('codYoutubeVideo')?.value
        ) {
      complete = false;
    } 
    this.isEditFormComplete = complete;
  }

  public saveAdd(): void{
    this.serviceVideo.createVideoclip(this.AddVideoForm.value).subscribe(
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

  editForm(content:any,codVideo:number,urlVideo:string,codYoutubeVideo:string){
    this.modalService.open(content, { centered: true });
    this.EditVideoForm.get('codVideo')?.setValue(codVideo);

    this.EditVideoForm.get('urlVideo')?.setValue(urlVideo);
    this.EditVideoForm.get('codYoutubeVideo')?.setValue(codYoutubeVideo);
  }

  saveUpdateVideo(){
    this.serviceVideo.updateVideo(this.EditVideoForm.value).subscribe(
      (result) =>{
        this.modalService.dismissAll();
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

