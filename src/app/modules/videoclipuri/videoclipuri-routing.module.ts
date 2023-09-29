import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'videoclip/:id',
    pathMatch:'full'
  },
  {
    path: 'videoclip/:id',
    component: VideoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoclipuriRoutingModule { }
