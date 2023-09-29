import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComentariuAdminComponent } from './comentariu-admin/comentariu-admin.component';
import { ComentariiRoutingModule } from './comentarii-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ComentariuAdminComponent
  ],
  imports: [
    CommonModule,
    ComentariiRoutingModule,
    SharedModule
  ]
})
export class ComentariiModule { }
