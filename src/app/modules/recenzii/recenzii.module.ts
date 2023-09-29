import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecenzieMedieComponent } from './recenzie-medie/recenzie-medie.component';
import { RecenziiCompIdComponent } from './recenzii-comp-id/recenzii-comp-id.component';

import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreareRecenzieComponent } from './creare-recenzie/creare-recenzie.component';
import { RecenziiCompIdSpViewComponent } from './recenzii-comp-id-sp-view/recenzii-comp-id-sp-viewcomponent';
import { RecenzieAdminComponent } from './recenzie-admin/recenzie-admin.component';
import { RecenziiRoutingModule } from './recenzii-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    RecenzieMedieComponent,
    RecenziiCompIdComponent,
    CreareRecenzieComponent,
    RecenziiCompIdSpViewComponent,
    RecenzieAdminComponent
  ],
  imports: [
    CommonModule,
    NgbRatingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RecenziiRoutingModule

  ],
  exports:[
    RecenzieMedieComponent,
    RecenziiCompIdComponent,
    RecenziiCompIdSpViewComponent,
  ]
})
export class RecenziiModule { }
