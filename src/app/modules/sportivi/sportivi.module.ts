import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportiviAntrenorComponent } from './sportivi-antrenor/sportivi-antrenor.component';
import { SportiviRoutingModule } from './sportivi-routing.module';
import { SportiviByIdViewComponent } from './sportivi-by-id-view/sportivi-by-id-view.component';
import { SportivByEmailComponent } from './sportiv-by-email/sportiv-by-email.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { IstoriceModule } from '../istorice/istorice.module';
import { SportiviClubComponent } from './sportivi-club/sportivi-club.component';
import { PostariModule } from '../postari/postari.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SportiviAntrenorComponent,
    SportiviByIdViewComponent,
    SportivByEmailComponent,
    SportiviClubComponent
  ],
  imports: [
    CommonModule,
    SportiviRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule,
    
    NgbDropdownModule,
    SharedModule,
    IstoriceModule,
    PostariModule
  ],
  exports:[
    SportiviAntrenorComponent,
    SportiviClubComponent
  ]
})
export class SportiviModule { }
