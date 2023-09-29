import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetNotificariUtilizComponent } from './get-notificari-utiliz/get-notificari-utiliz.component';
import { NotificariRoutingModule } from './notificari-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GetNotificariUtilizComponent,
  ],
  imports: [
    CommonModule,
    NotificariRoutingModule,
    SharedModule
  ],
})
export class NotificariModule { }
