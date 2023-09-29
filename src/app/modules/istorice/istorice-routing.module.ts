import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RezultateCompetitieFiltrateComponent } from './rezultate-competitie-filtrate/rezultate-competitie-filtrate.component';
import { IerarhieSportiviComponent } from './ierarhie-sportivi/ierarhie-sportivi.component';
import { AuthGuard } from 'src/app/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'istoric/:id',
    pathMatch:'full'
  },
  {
    path: 'istoric/:id',
    component: RezultateCompetitieFiltrateComponent,
  },
  {
    path:'ierarhie',
    component: IerarhieSportiviComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IstoriceRoutingModule { }
