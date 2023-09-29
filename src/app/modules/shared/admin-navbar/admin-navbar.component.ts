import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { CompetitiiService } from 'src/app/services/competitii.service';
import { VideoclipuriService } from 'src/app/services/videoclipuri.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit{
  hasToken = false;
  email = localStorage.getItem('email');
  constructor(
    private service: AntrenoriService,
    private serviceComp: CompetitiiService,
    private serviceAuth: AuthentifService,
    private serviceVideo: VideoclipuriService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
    }
  }
  onLogout() {
    this.serviceAuth.logoutAdmin();
   setTimeout(function () {
    window.location.reload();
  }, 1000);
  }
}
