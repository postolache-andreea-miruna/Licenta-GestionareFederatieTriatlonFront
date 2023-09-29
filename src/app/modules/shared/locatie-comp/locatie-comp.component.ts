import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { LocatiiService } from 'src/app/services/locatii.service';

declare var google: any;
@Component({
  selector: 'app-locatie-comp',
  templateUrl: './locatie-comp.component.html',
  styleUrls: ['./locatie-comp.component.scss']
})
export class LocatieCompComponent implements OnInit {
  public sub: Subscription = new Subscription;
  public id: number | undefined;

  public locatieId = {
    tara: '',
    oras: '',
    strada: '',
    numarStrada: 0,
    detaliiSuplimentare: '',
  };
  @ViewChild('mapElem') harta: any;


  constructor(
    private service: LocatiiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id) {
        this.getLocatieByIdComp(this.id);
      }
    });

  }

  public getLocatieByIdComp(id: number): void {
    this.service.GetLocatieByIdComp(id).subscribe(
      (result) => {
        this.locatieId = result[0];
        console.log(this.locatieId);
        setTimeout(() => {
        this.sara();},1000);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  public sara(): void { 
      const address = this.locatieId.numarStrada + ', ' + this.locatieId.strada + ', ' + this.locatieId.oras + ', ' + this.locatieId.tara + ',' + this.locatieId.detaliiSuplimentare;
      this.adresaHarta(address);
 
}

  public adresaHarta(address: string){
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAkzYVVZi9LUQrvah8mAKerGvQTMgGsEU0`)
        .then((response) => {
          console.log(response);
          return response.json();
        }).then(jsonData => {
          console.log("data",jsonData.results[0].geometry.location); 
          const map = new google.maps.Map(this.harta.nativeElement, {
            center: jsonData.results[0].geometry.location,
            zoom: 14,
            });

          const strada = this.locatieId.strada ? this.locatieId.strada + ', ' : ''; // daca este null atunci este string vid
          const numarStrada = this.locatieId.numarStrada ? this.locatieId.numarStrada + ', ' : '';
          const detaliiSuplimentare = this.locatieId.detaliiSuplimentare ?  ', ' + this.locatieId.detaliiSuplimentare  : '';

          new google.maps.Marker({
              position: jsonData.results[0].geometry.location,
              map,
              title: this.locatieId.tara + ', ' + this.locatieId.oras + numarStrada + strada +detaliiSuplimentare
              });
        })
        .catch(error => {
          console.log(error);
        })
  }
}


