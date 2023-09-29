import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubComponent } from './club/club.component';
import { CluburiRoutingModule } from './cluburi-routing.module';
import { ClubidComponent } from './clubid/clubid.component';
import { SportiviModule } from '../sportivi/sportivi.module';
import { AntrenoriModule } from '../antrenori/antrenori.module';
import { ClubAdminComponent } from './club-admin/club-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ClubComponent,
    ClubidComponent,
    ClubAdminComponent
  ],
  imports: [
    CommonModule,
    CluburiRoutingModule,
    SportiviModule,
    AntrenoriModule,
    
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    NgbPopoverModule,
  ]
})
export class CluburiModule { }
