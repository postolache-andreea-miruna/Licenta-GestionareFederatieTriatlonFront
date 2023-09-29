import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecenziileSportivuluiComponent } from './recenziile-sportivului/recenziile-sportivului.component';
import { AuthSportivGuard } from 'src/app/auth-sportiv.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'recenzii',
    pathMatch:'full'
  },
  {
    path: 'recenziiSp/:email',
    component: RecenziileSportivuluiComponent,
    canActivate:[AuthSportivGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecenziiSpRoutingModule { }
