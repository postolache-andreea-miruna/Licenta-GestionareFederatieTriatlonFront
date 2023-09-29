import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { MessagesComponent } from './messages/messages.component';
import { HomepageModule } from './modules/homepage/homepage.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { AdminHomeComponent } from './modules/admin-homepage/admin-home/admin-home.component';
import { AdminHomepageModule } from './modules/admin-homepage/admin-homepage.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivateChatComponent,
    ChatInputComponent,
    MessagesComponent,
  ],
  imports: [
    HomepageModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter : () => {
          return localStorage.getItem("token");
        }
      }
    }),
    BrowserAnimationsModule,
    SharedModule,
    AdminHomepageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
