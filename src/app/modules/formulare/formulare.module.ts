import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularIdComponent } from './formular-id/formular-id.component';
import { FormulareSportivComponent } from './formulare-sportiv/formulare-sportiv.component';
import { FormulareRoutingModule } from './formulare-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormulareAdminComponent } from './formulare-admin/formulare-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormularIdComponent,
    FormulareSportivComponent,
    FormulareAdminComponent
  ],
  imports: [
    CommonModule,
    FormulareRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FormulareModule { }
