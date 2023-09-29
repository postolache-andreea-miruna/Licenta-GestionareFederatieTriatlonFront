import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetNotificariUtilizComponent } from './get-notificari-utiliz/get-notificari-utiliz.component';
import { AuthSportivGuard } from 'src/app/auth-sportiv.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'notificari/:email',
    pathMatch:'full'
  },
  {
    path: 'notificari/:email',
    component: GetNotificariUtilizComponent,
    canActivate:[AuthSportivGuard] 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificariRoutingModule { }
