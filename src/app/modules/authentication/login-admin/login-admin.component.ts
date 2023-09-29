import { FactoryTarget } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/models/login';
import { AuthentifService } from 'src/app/services/authentif.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  apiErrorMessages: string[] =[];
  isLoginFormComplete = false;

  loginFailed = false;
  hasToken = false;

  openChat = false;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService,private authentifService: AuthentifService, private service: AuthentifService,
    private route: ActivatedRoute,private router:Router){}
  
  ngOnInit(): void {


    const token = localStorage.getItem('token');
    if (token!==null) {
      this.hasToken = true;
    }

    this.initializeForm();

    this.loginForm.valueChanges.subscribe(() => {
      this.checkFormComplete();
    });
  }

  initializeForm(){
    this.loginForm = this.formBuilder.group({
      email: [''],
      parola: [''],
    })
  }

  checkFormComplete() {
    let complete = true;
    if (!this.loginForm.get('email')?.value || !this.loginForm.get('parola')?.value) {
      complete = false;
    } 
    this.isLoginFormComplete = complete;
  }


  submitForm() {
    var newUser = new Login(this.loginForm.value);
    this.submitted = true;
    this.apiErrorMessages = [];

    if(this.loginForm.valid){
      this.authentifService.loginAdmin(newUser).subscribe({
        next: () =>{

          this.authentifService.roles(newUser).subscribe((res) =>{});
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        
         
          this.openChat = true;
          this.loginForm.reset();
          this.submitted = false;
        },
        error: error => {
          if(typeof (error.error) !== 'object') {
            this.apiErrorMessages.push(error.error);
          }
          this.loginFailed = true; 
        }
      })
    }
  }

  public closeChat(){
    this.openChat = false;
  }

}