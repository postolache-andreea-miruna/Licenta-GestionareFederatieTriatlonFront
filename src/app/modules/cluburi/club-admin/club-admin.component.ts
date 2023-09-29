import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClubModelTotal } from 'src/app/models/clubModelTotal';
import { CluburiModel } from 'src/app/models/cluburiModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CluburiService } from 'src/app/services/cluburi.service';

@Component({
  selector: 'app-club-admin',
  templateUrl: './club-admin.component.html',
  styleUrls: ['./club-admin.component.scss']
})
export class ClubAdminComponent implements OnInit{
  isFormComplete = false;
  isEditFormComplete = false;

  cluburi: ClubModelTotal[]=[];

  hasToken = false;
  email = localStorage.getItem('email');
  public pozaProfil = { 
    urlPozaProfil: 'default poza', 
  };
  public AddClubForm: FormGroup = new FormGroup({
    nume: new FormControl(''),
    email: new FormControl(''),
    descriere: new FormControl(''),
    urlPozaClub:new FormControl(''),
  });

  public EditClubForm: FormGroup = new FormGroup({
    codClub: new FormControl(0),
    nume: new FormControl(''),
    email: new FormControl(''),
    descriere: new FormControl(''),
    urlPozaClub:new FormControl(''),
  });

  onFileSelected(event:any) {
    if (event.target.files && event.target.files[0] && event.target.files[0] instanceof Blob) {
      const file: Blob = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.AddClubForm.patchValue({
          urlPozaClub: reader.result
        });
      };
    }
  }
  constructor(
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceClub: CluburiService,
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
      this.getAllCluburi();   
    }
    this.AddClubForm.valueChanges.subscribe(() => {
      this.checkFormComplete();
    });
    this.EditClubForm.valueChanges.subscribe(() => {
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


  public getAllCluburi(){
    this.serviceClub.getCluburiTotal().subscribe(
      (result) => {
        this.cluburi = result;
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


  checkFormComplete() {  
    let complete = true;
    if (!this.AddClubForm.get('nume')?.value ||
        !this.AddClubForm.get('email')?.value ||
        !this.AddClubForm.get('descriere')?.value ||
        !this.AddClubForm.get('urlPozaClub')?.value
        ) {
      complete = false;
    } 
    this.isFormComplete = complete;
  }

  checkEditFormComplete() {  
    let complete = true;
    if (!this.EditClubForm.get('nume')?.value ||
        !this.EditClubForm.get('email')?.value ||
        !this.EditClubForm.get('descriere')?.value ||
        !this.EditClubForm.get('urlPozaClub')?.value
        ) {
      complete = false;
    } 
    this.isEditFormComplete = complete;
  }

  
  modalAdClub(content: any) {
    this.modalService.open(content, { centered: true });
  }

  public saveAdd(): void{
    this.serviceClub.createClub(this.AddClubForm.value).subscribe(
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


  editForm(content:any,codClub:number,nume:string,email:string,descriere:string,urlPozaClub:string){
    this.modalService.open(content, { centered: true });
console.log("urlPoza",urlPozaClub);
    this.EditClubForm.get('codClub')?.setValue(codClub);

    this.EditClubForm.get('nume')?.setValue(nume);
    this.EditClubForm.get('email')?.setValue(email);
    this.EditClubForm.get('descriere')?.setValue(descriere);
    this.EditClubForm.get('urlPozaClub')?.setValue(urlPozaClub);
  }
  onFileSelectedEdit(event:any) {
    if (event.target.files && event.target.files[0] && event.target.files[0] instanceof Blob) {
      const file: Blob = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.EditClubForm.patchValue({
          urlPozaClub: reader.result
        });
      };
    }
  }
  saveUpdateClub(){
    this.serviceClub.updateClub(this.EditClubForm.value).subscribe(
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
