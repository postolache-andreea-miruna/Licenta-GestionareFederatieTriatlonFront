import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecenziileSportivuluiComponent } from './recenziile-sportivului/recenziile-sportivului.component';
import { RecenziiSpRoutingModule } from './recenzii-sp-routing.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RecenziileSportivuluiComponent,
  ],
  imports: [
    CommonModule,
    RecenziiSpRoutingModule,
    NgbRatingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class RecenziiSpModule { }
