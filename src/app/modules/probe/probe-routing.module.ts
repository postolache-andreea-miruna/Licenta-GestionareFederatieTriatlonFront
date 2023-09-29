import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProbaAdminComponent } from './proba-admin/proba-admin.component';
import { AuthAdminGuard } from 'src/app/auth-admin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'proba',
    pathMatch:'full'
  },
  {
    path: 'proba',
    component: ProbaAdminComponent,
    canActivate: [AuthAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProbeRoutingModule { }
