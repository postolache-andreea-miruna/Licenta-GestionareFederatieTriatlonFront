import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocatieCompComponent } from './locatie-comp/locatie-comp.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
//import {} from '@types/googlemaps';



@NgModule({
  declarations: [
    LocatieCompComponent,
    NavbarComponent,
    AdminNavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LocatieCompComponent,
    NavbarComponent,
    AdminNavbarComponent
  ]
})
export class SharedModule { }
