import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAntrenorGuard } from 'src/app/auth-antrenor.guard';
import { AuthSportivGuard } from 'src/app/auth-sportiv.guard';
import { FormulareSportivComponent } from './formulare-sportiv/formulare-sportiv.component';
import { FormularIdComponent } from './formular-id/formular-id.component';
import { FormulareAdminComponent } from './formulare-admin/formulare-admin.component';
import { AuthAdminGuard } from 'src/app/auth-admin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'formular/:email',
    pathMatch:'full'
  },
  {
    path: 'formular/:email',
    component: FormulareSportivComponent,
    canActivate: [AuthSportivGuard]
  },
  {
    path: 'formularId/:id',
    component: FormularIdComponent,
    canActivate: [AuthSportivGuard]
  },
  {
    path: 'admin',
    component: FormulareAdminComponent,
    canActivate: [AuthAdminGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulareRoutingModule { }
