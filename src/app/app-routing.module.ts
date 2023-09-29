import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { MyHomeComponent } from './modules/homepage/my-home/my-home.component';
import { AdminHomeComponent } from './modules/admin-homepage/admin-home/admin-home.component';
import { AuthAdminGuard } from './auth-admin.guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'home',
    component: MyHomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'cl',
    loadChildren: () => import('src/app/modules/cluburi/cluburi.module').then(m => m.CluburiModule)
  },
  {
    path: 'comp',
    loadChildren: () => import('src/app/modules/competitii/competitii.module').then(m => m.CompetitiiModule)
  },
  {
    path: 'sp',
    loadChildren: () => import('src/app/modules/sportivi/sportivi.module').then(m => m.SportiviModule)
  },
  {
    path: 'antr',
    loadChildren: () => import('src/app/modules/antrenori/antrenori.module').then(m => m.AntrenoriModule)
  },
  {
    path: 'form',
    loadChildren: () => import('src/app/modules/formulare/formulare.module').then(m => m.FormulareModule)
  },
  {
    path: 'rec',
    loadChildren: () => import('src/app/modules/recenzii-sp/recenzii-sp.module').then(m => m.RecenziiSpModule)
  },
  {
    path: 'recenz',
    loadChildren: () => import('src/app/modules/recenzii/recenzii.module').then(m => m.RecenziiModule)
  },
  {
    path: 'ist',
    loadChildren: () => import('src/app/modules/istorice/istorice.module').then(m => m.IstoriceModule)
  },
  {
    path: 'notif',
    loadChildren: () => import('src/app/modules/notificari/notificari.module').then(m => m.NotificariModule)
  },
  {
    path: 'post',
    loadChildren: () => import('src/app/modules/postari/postari.module').then(m => m.PostariModule)
  },
  {
    path: 'yt',
    loadChildren: () => import('src/app/modules/videoclipuri/videoclipuri.module').then(m => m.VideoclipuriModule)
  },
  {
    path: 'pr',
    loadChildren: () => import('src/app/modules/probe/probe.module').then(m => m.ProbeModule)
  },
  {
    path: 'tip',
    loadChildren: () => import('src/app/modules/tipuri/tipuri.module').then(m => m.TipuriModule)
  },
  {
    path: 'com',
    loadChildren: () => import('src/app/modules/comentarii/comentarii.module').then(m => m.ComentariiModule)
  },
  {
    path:'chat',
    component: ChatComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin/home',
    component:AdminHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
