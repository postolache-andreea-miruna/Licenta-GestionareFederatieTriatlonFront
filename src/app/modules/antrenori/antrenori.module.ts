import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntrenorByEmailComponent } from './antrenor-by-email/antrenor-by-email.component';
import { AntrenorByIdViewComponent } from './antrenor-by-id-view/antrenor-by-id-view.component';
import { SportiviModule } from '../sportivi/sportivi.module';
import { IstoriceModule } from '../istorice/istorice.module';
import { AntrenoriClubComponent } from './antrenori-club/antrenori-club.component';
import { AntrenoriRoutingModule } from './antrenori-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostariModule } from '../postari/postari.module';
import { SharedModule } from '../shared/shared.module';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AntrenorByEmailComponent,
    AntrenorByIdViewComponent,
    AntrenoriClubComponent
  ],
  imports: [
    CommonModule,
    AntrenoriRoutingModule,
    SportiviModule,
    IstoriceModule,
    ReactiveFormsModule,
    FormsModule,
    PostariModule,
    SharedModule,
    NgbPopoverModule
  ],
  exports:[
    AntrenoriClubComponent
  ]
})
export class AntrenoriModule { }
