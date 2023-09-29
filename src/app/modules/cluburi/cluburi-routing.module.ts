import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubComponent } from './club/club.component';
import { ClubidComponent } from './clubid/clubid.component';
import { ClubAdminComponent } from './club-admin/club-admin.component';
import { AuthAdminGuard } from 'src/app/auth-admin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'club',
    pathMatch:'full'
  },
  {
    path: 'club',
    component: ClubComponent
  },
  {
    path: 'clubid/:id',
    component: ClubidComponent,
  },
  {
    path:'admin',
    component: ClubAdminComponent,
    canActivate: [AuthAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CluburiRoutingModule { }
