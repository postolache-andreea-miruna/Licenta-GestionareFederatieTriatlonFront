import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipuriAdminComponent } from './tipuri-admin/tipuri-admin.component';
import { AuthAdminGuard } from 'src/app/auth-admin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch:'full'
  },
  {
    path: 'admin',
    component: TipuriAdminComponent,
    canActivate:[AuthAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipuriRoutingModule { }
