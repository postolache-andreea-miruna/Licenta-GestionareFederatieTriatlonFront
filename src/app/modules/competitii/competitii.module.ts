import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { CompetitieComponent } from './competitie/competitie.component';
import { CompetitiiRoutingModule } from './competitii-routing.module';
import { CompidComponent } from './compid/compid.component';
import { SharedModule } from '../shared/shared.module';
import { CompetitiiSportivComponent } from './competitii-sportiv/competitii-sportiv.component';
import { CompIdViewSpComponent } from './comp-id-view-sp/comp-id-view-sp.component';
import { IstoriceModule } from '../istorice/istorice.module';
import { CompetitieAdminComponent } from './competitie-admin/competitie-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CompetitieIdAdminComponent } from './competitie-id-admin/competitie-id-admin.component';
import { RecenziiModule } from '../recenzii/recenzii.module';


@NgModule({
  declarations: [
    CompetitieComponent,
    CompidComponent,
    CompetitiiSportivComponent,
    CompIdViewSpComponent,
    CompetitieAdminComponent,
    CompetitieIdAdminComponent
  ],
  imports: [
    CommonModule,
    CompetitiiRoutingModule,
    SharedModule,
    RecenziiModule,
    IstoriceModule,
     
    FormsModule, 
    ReactiveFormsModule,NgbDatepickerModule, JsonPipe,NgbTimepickerModule
  ]
})
export class CompetitiiModule { }
