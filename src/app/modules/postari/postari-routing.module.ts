import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { PostareViewUtilizComponent } from './postare-view-utiliz/postare-view-utiliz.component';
import { PostariUtilizatorComponent } from './postari-utilizator/postari-utilizator.component';
import { PostareAdminComponent } from './postare-admin/postare-admin.component';
import { AuthAdminGuard } from 'src/app/auth-admin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'postari/:email',
    pathMatch:'full'
  },
  {
    path: 'postari/:email',
    component: PostareViewUtilizComponent,
    canActivate: [AuthGuard]
  },  
  {
    path: 'postariUtiliz/:email',
    component: PostariUtilizatorComponent,
    canActivate: [AuthGuard]
  },  
  {
    path: 'admin',
    component: PostareAdminComponent,
    canActivate: [AuthAdminGuard]
  },  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostariRoutingModule { }
