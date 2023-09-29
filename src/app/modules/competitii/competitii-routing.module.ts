import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitieComponent } from './competitie/competitie.component';
import { CompidComponent } from './compid/compid.component';
import { CompetitiiSportivComponent } from './competitii-sportiv/competitii-sportiv.component';
import { CompIdViewSpComponent } from './comp-id-view-sp/comp-id-view-sp.component';
import { CompetitieAdminComponent } from './competitie-admin/competitie-admin.component';
import { CompetitieIdAdminComponent } from './competitie-id-admin/competitie-id-admin.component';
import { AuthAdminGuard } from 'src/app/auth-admin.guard';
import { AuthSportivGuard } from 'src/app/auth-sportiv.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'competitie',
    pathMatch:'full'
  },
  {
    path: 'competitie',
    component: CompetitieComponent
  },
  {
    path: 'compid/:id',
    component: CompidComponent,
  },
  {
    path: 'competitiiId/:id',
    component: CompIdViewSpComponent,
    canActivate: [AuthSportivGuard]
  },
  {
    path: 'competitii/:email',
    component: CompetitiiSportivComponent,
    canActivate: [AuthSportivGuard]
  },
  {
    path: 'admin',
    component: CompetitieAdminComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'admin/:id',
    component: CompetitieIdAdminComponent,
    canActivate: [AuthAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitiiRoutingModule { }
