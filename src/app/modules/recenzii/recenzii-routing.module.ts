import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecenzieAdminComponent } from './recenzie-admin/recenzie-admin.component';
import { AuthAdminGuard } from 'src/app/auth-admin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch:'full'
  },
  {
    path: 'admin',
    component: RecenzieAdminComponent,
    canActivate: [AuthAdminGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecenziiRoutingModule { }
