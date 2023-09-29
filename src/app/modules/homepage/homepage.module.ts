import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHomeComponent } from './my-home/my-home.component';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { NotificariModule } from '../notificari/notificari.module';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MyHomeComponent,
    
  ],
  imports: [
    CommonModule,
    NgbCarouselModule, 
    NgIf,
    SharedModule
    
  ]
})
export class HomepageModule { }
