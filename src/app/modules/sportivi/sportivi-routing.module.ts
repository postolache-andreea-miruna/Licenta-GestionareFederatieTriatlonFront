import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportiviAntrenorComponent } from './sportivi-antrenor/sportivi-antrenor.component';
import { AuthAntrenorGuard } from 'src/app/auth-antrenor.guard';
import { SportiviByIdViewComponent } from './sportivi-by-id-view/sportivi-by-id-view.component';
import { AuthSportivGuard } from 'src/app/auth-sportiv.guard';
import { SportivByEmailComponent } from './sportiv-by-email/sportiv-by-email.component';
import { AuthGuard } from 'src/app/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'sportiv/:email',
    pathMatch:'full'
  },
  {
    path: 'sportiv/:email',
    component: SportiviAntrenorComponent,
    canActivate: [AuthAntrenorGuard]
  },
  {
    path: 'sportivid/:emailul',
    component: SportiviByIdViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sportivByEmail/:email',
    component: SportivByEmailComponent,
    canActivate: [AuthSportivGuard]
  },  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportiviRoutingModule { }
