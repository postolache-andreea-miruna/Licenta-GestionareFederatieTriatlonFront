import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAntrenorGuard } from 'src/app/auth-antrenor.guard';
import { AntrenorByEmailComponent } from './antrenor-by-email/antrenor-by-email.component';
import { AntrenorByIdViewComponent } from './antrenor-by-id-view/antrenor-by-id-view.component';
import { AuthSportivGuard } from 'src/app/auth-sportiv.guard';
import { AuthGuard } from 'src/app/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'antrenor/:email',
    pathMatch:'full'
  },
  {
    path: 'antrenor/:email',
    component: AntrenorByEmailComponent,
    canActivate: [AuthAntrenorGuard]
  },  
  {
    path: 'antrenorIdView/:email',
    component: AntrenorByIdViewComponent,
    canActivate: [AuthGuard]
  },  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntrenoriRoutingModule { }
