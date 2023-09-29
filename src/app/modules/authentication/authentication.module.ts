import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from 'src/app/chat/chat.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [

    LoginComponent,
    LoginAdminComponent,
    RegisterComponent,
    ChatComponent

  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    NgbDropdownModule,

    FormsModule, 
    ReactiveFormsModule,
    SharedModule


  ]
})
export class AuthenticationModule { }
