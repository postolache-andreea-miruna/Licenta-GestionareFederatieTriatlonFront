import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipuriAdminComponent } from './tipuri-admin/tipuri-admin.component';
import { TipuriRoutingModule } from './tipuri-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TipuriAdminComponent
  ],
  imports: [
    CommonModule,
    TipuriRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbPopoverModule,
    SharedModule
  ]
})
export class TipuriModule { }
