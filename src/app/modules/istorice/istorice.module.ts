import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateIstoricComponent } from './create-istoric/create-istoric.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BestOfComponent } from './best-of/best-of.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { IstoricSportivComponent } from './istoric-sportiv/istoric-sportiv.component';
import { BestOfViewComponent } from './best-of-view/best-of-view.component';
import { IstoricSportivViewComponent } from './istoric-sportiv-view/istoric-sportiv-view.component';
import { RezultateCompetitieFiltrateComponent } from './rezultate-competitie-filtrate/rezultate-competitie-filtrate.component';
import { IstoriceRoutingModule } from './istorice-routing.module';
import { IerarhieSportiviComponent } from './ierarhie-sportivi/ierarhie-sportivi.component';
import { TopCluburiCompIdComponent } from './top-cluburi-comp-id/top-cluburi-comp-id.component';
import { NgChartsModule } from 'ng2-charts';
import 'chart.js';
import { StatisticiRezultateMedaliiComponent } from './statistici-rezultate-medalii/statistici-rezultate-medalii.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreateIstoricComponent,
    BestOfComponent,
    IstoricSportivComponent,
    BestOfViewComponent,
    IstoricSportivViewComponent,
    RezultateCompetitieFiltrateComponent,
    IerarhieSportiviComponent,
    TopCluburiCompIdComponent,
    StatisticiRezultateMedaliiComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    IstoriceRoutingModule,
    NgChartsModule,
    SharedModule

  ],
  exports:[
    CreateIstoricComponent,
    BestOfComponent,
    IstoricSportivComponent,
    BestOfViewComponent,
    IstoricSportivViewComponent,
    TopCluburiCompIdComponent,
    StatisticiRezultateMedaliiComponent,
  ],
})
export class IstoriceModule { }
