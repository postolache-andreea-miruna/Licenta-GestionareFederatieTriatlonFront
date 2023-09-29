import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComentariuAdminComponent } from './comentariu-admin/comentariu-admin.component';
import { AuthAdminGuard } from 'src/app/auth-admin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch:'full'
  },
  {
    path: 'admin',
    component: ComentariuAdminComponent,
    canActivate: [AuthAdminGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComentariiRoutingModule { }
