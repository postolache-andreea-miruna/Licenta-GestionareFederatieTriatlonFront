import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostareViewUtilizComponent } from './postare-view-utiliz/postare-view-utiliz.component';
import { PostariRoutingModule } from './postari-routing.module';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostariUtilizatorComponent } from './postari-utilizator/postari-utilizator.component';
import { PostariUtilizatorOtherViewComponent } from './postari-utilizator-other-view/postari-utilizator-other-view.component';
import { SharedModule } from '../shared/shared.module';
import { PostareAdminComponent } from './postare-admin/postare-admin.component';



@NgModule({
  declarations: [
    PostareViewUtilizComponent,
    PostariUtilizatorComponent,
    PostariUtilizatorOtherViewComponent,
    PostareAdminComponent
  ],
  imports: [
    CommonModule,
    PostariRoutingModule,
    NgbPopoverModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    PostariUtilizatorOtherViewComponent
  ]
})
export class PostariModule { }
