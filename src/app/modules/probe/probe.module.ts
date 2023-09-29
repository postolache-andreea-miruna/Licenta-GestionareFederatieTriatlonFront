import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ProbaAdminComponent } from './proba-admin/proba-admin.component';
import { ProbeRoutingModule } from './probe-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProbaAdminComponent
  ],
  imports: [
    CommonModule,
    ProbeRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbTimepickerModule,
    FormsModule,
    JsonPipe,
    NgbPopoverModule
  ]
})
export class ProbeModule { }
