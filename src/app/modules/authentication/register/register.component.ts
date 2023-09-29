import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { generate } from 'rxjs';
import { Register } from 'src/app/models/register';
import { AuthentifService } from 'src/app/services/authentif.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  isFormComplete = false;
  hasToken = false;
  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token!==null) {
      this.hasToken = true;
    }


    this.registrationForm.valueChanges.subscribe(() => {
      this.checkFormComplete();
      this.checkEmailFormat(this.registrationForm.get('email')?.value)
      this.checkPasswordFormat(this.registrationForm.get('parola')?.value)
    });

  }

  public registrationForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    parola: new FormControl(''),
    codRol: new FormControl(''),
    nume:new FormControl(''),
    prenume:new FormControl(''),
    abonareStiri:new FormControl(true),
    urlPozaProfil:new FormControl(''),
    emailAntrenor:new FormControl(''),
    codClub:new FormControl(0),
    numarLegitimatie:new FormControl(0),
    dataNastere:new FormControl('2001-03-26T00:00:00'),
    gen:new FormControl(''),
    gradPregatire:new FormControl('')
  });
  emailIsValid = false;

  checkEmailFormat(email: string) {
    this.emailIsValid = /^[\w.-]+@([-\w]+\.)+[\w-]{2,4}$/.test(email);
  }

  passwordIsValid = false;

  checkPasswordFormat(passw: string){
    this.passwordIsValid =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(passw);
  }

  constructor(private calendar: NgbCalendar,private authentifService : AuthentifService) { }
  

  
  onFileSelected(event:any) {
    if (event.target.files && event.target.files[0] && event.target.files[0] instanceof Blob) {
      const file: Blob = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registrationForm.patchValue({
          urlPozaProfil: reader.result
        });
      };
    }
  }
  

  checkFormComplete() {  
    const role = this.registrationForm.get('codRol')?.value;
    let complete = true;
    if (!this.registrationForm.get('email')?.value ||
        !this.registrationForm.get('parola')?.value ||
        !this.registrationForm.get('codRol')?.value ||
        !this.registrationForm.get('nume')?.value ||
        !this.registrationForm.get('prenume')?.value ||
        !this.registrationForm.get('abonareStiri')?.value ||
        !this.registrationForm.get('urlPozaProfil')?.value||
        !this.registrationForm.get('codClub')?.value 
        ) {
      complete = false;
    } else if (role === 'SportivUtilizator') {
      if (
          !this.registrationForm.get('emailAntrenor')?.value ||
          !this.registrationForm.get('numarLegitimatie')?.value ||
          !this.registrationForm.get('dataNastere')?.value ||
          !this.registrationForm.get('gen')?.value) {
        complete = false;
      }
    } else if (role === 'AntrenorUtilizator') {
      if (!this.registrationForm.get('gradPregatire')?.value) {
        complete = false;
      }
    }
    this.isFormComplete = complete;
  }


  onRegister(){
    localStorage.setItem('RoleId', this.registrationForm.value.codRol);
    var newUser = new Register(this.registrationForm.value);
    this.authentifService.register(newUser).subscribe();
  }

}
