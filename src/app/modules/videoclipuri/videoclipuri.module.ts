import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { VideoclipuriRoutingModule } from './videoclipuri-routing.module';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [
    CommonModule,
    VideoclipuriRoutingModule,
    NgxYoutubePlayerModule.forRoot(),
    SharedModule
  ]
})
export class VideoclipuriModule { }
