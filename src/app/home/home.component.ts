import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from '../models/login';
import { AuthentifService } from '../services/authentif.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  userForm: FormGroup = new FormGroup({});
  submitted = false;
  apiErrorMessages: string[] =[];

  openChat = false;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService,private authentifService: AuthentifService){}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.userForm = this.formBuilder.group({
      email: [''],
      parola: [''],
    })
  }

  submitForm() {
    var newUser = new Login(this.userForm.value);
    this.submitted = true;
    this.apiErrorMessages = [];

    if(this.userForm.valid){
      this.authentifService.login(newUser).subscribe({
        next: () =>{
          this.chatService.email = this.userForm.get('email')?.value;
          console.log(this.chatService.email);
          this.openChat = true;
          this.userForm.reset();
          this.submitted = false;
        },
        error: error => {
          if(typeof (error.error) !== 'object') {
            this.apiErrorMessages.push(error.error);
          }
        }
      })
    }
  }

  public closeChat(){
    this.openChat = false;
  }
}
