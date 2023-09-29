import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComentariiModel } from 'src/app/models/comentariiModel';
import { PostareComentarii } from 'src/app/models/postareComentarii';
import { PostareComentariiReactii } from 'src/app/models/postareComentariiReactii';
import { ReactiePostareCreateModel } from 'src/app/models/reactiePostareCreateModel';
import { ReactiePostareUpdateFericireModel } from 'src/app/models/reactiePostareUpdateFericireModel';
import { ReactiePostareUpdateTristeteModel } from 'src/app/models/reactiePostareUpdateTristeteModel';
import { AntrenoriService } from 'src/app/services/antrenori.service';
import { AuthentifService } from 'src/app/services/authentif.service';
import { ComentariiService } from 'src/app/services/comentarii.service';
import { NotificariService } from 'src/app/services/notificari.service';
import { PostariService } from 'src/app/services/postari.service';
import { ReactiipostareService } from 'src/app/services/reactiipostare.service';

@Component({
  selector: 'app-postare-view-utiliz',
  templateUrl: './postare-view-utiliz.component.html',
  styleUrls: ['./postare-view-utiliz.component.scss']
})
export class PostareViewUtilizComponent implements OnInit {
  hasToken = false;
  logareRol = "";
  logareRol2 = "";
  email = localStorage.getItem('email'); //email utilizator
  nrNotifNecitite = 0;

  postariVazuteUtiliz: PostareComentarii[] = [];
  postariVazuteUtiliz2: PostareComentariiReactii[]=[];

  public pozaProfil = {
    urlPozaProfil: 'default poza',
  };

  public nenulEmail() { //pentru a transmite email ca string
    if (this.email != null)
      return this.email;
    else
      return "";
  }
  constructor(
    private service: AntrenoriService,
    private serviceAuth: AuthentifService,
    private serviceNotif: NotificariService,
    private servicePost: PostariService,
    private router: Router,
    private modalService: NgbModal,
    private serviceCom: ComentariiService,
    private serviceReactii: ReactiipostareService
  ) { }

  public postareAddForm: FormGroup = new FormGroup({
    urlPoza: new FormControl(''),
    emailUtilizator: new FormControl(''),
    descriere: new FormControl('')
  });

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }
    if (this.email != null) {
      this.getPoza(this.email);
      this.getNrNotifNecitite(this.email);
      this.getPostariViewByMe(this.email);
    }
  }
  public validToken(token:string){
    this.serviceAuth.tokenValid(token).subscribe(
      (result)=>{
        if(result === true){
          this.onLogout();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }


  public getPostariViewByMe(email: string) {//apelam la finaul tristetii si fericirii
    this.servicePost.GetPostariVazuteDeUtilizEmail(email).subscribe(
      (result) => {
        result.map((obj) => {
          this.serviceReactii.GetReactiiForUserPostare(this.nenulEmail(), obj.codPostare).subscribe(
            (result2) => {
              if(result2!==null)
              {console.log("GetReactiiForUserPostare", result2);
              obj.reactieFericireUtilizator = result2.reactieFericire;
              obj.reactiiTristeteUtilizator = result2.reactieTristete;}
              else{
                obj.reactieFericireUtilizator = false;
              obj.reactiiTristeteUtilizator = false;
              }
              return obj;
            },
           
            (error) => {
              console.log(error);
            }
          );
          });
        this.postariVazuteUtiliz = result;
        console.log(this.postariVazuteUtiliz);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  modalAdPostare(content: any) {
    this.modalService.open(content, { centered: true });
  }



  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0] && event.target.files[0] instanceof Blob) {
      const file: Blob = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.postareAddForm.patchValue({
          urlPoza: reader.result
        });
      };
    }
  }
  onFileSelectedd(event: any) {
    if (event.target.files && event.target.files[0] && event.target.files[0] instanceof Blob) {
      const file: Blob = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.postareAddForm.patchValue({
          urlPoza: file
        });
      };
    }
  }


  public saveAdd(): void {
    console.log("desc", this.postareAddForm.get('descriere')?.value);


    this.postareAddForm.get('emailUtilizator')?.setValue(this.email);
    this.servicePost.createPostare(this.postareAddForm.value).subscribe(
      (result) => {
        console.log(result);
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  postariSelectate = new Map<number, boolean>();
  comentarii(cod: number) {//prima data este undefined, dupa alterneaza true/false
    console.log("cod", cod);
    const valCurenta = this.postariSelectate.get(cod);
    console.log(this.postariSelectate.get(cod));
    this.postariSelectate.set(cod, !valCurenta);
  }

  public comentariuAddForm: FormGroup = new FormGroup({
    codPostare: new FormControl(''),
    mesajComentariu: new FormControl(''),
    emailUtilizatorComentariu: new FormControl(''),
  });

  public saveCom(cod: number): void {//codPostare
    this.comentariuAddForm.get('codPostare')?.setValue(cod);
    this.comentariuAddForm.get('emailUtilizatorComentariu')?.setValue(this.email);

    this.serviceCom.createComentariu(this.comentariuAddForm.value).subscribe(
      (result) => {
        console.log(result);


        this.getPoza(this.nenulEmail());
      this.getPostariViewByMe(this.nenulEmail());
      this.comentariuAddForm.get('mesajComentariu')?.setValue('');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public comEditForm: FormGroup = new FormGroup({
    mesajComentariu: new FormControl(''),
    codComentariu: new FormControl(0)
  });

  public editComentariu(codComentariu: number, contentEdit: any, text: string) {
    this.modalService.open(contentEdit, { centered: true });

    this.comEditForm.get('mesajComentariu')?.setValue(text);
    this.comEditForm.get('codComentariu')?.setValue(codComentariu);
  }

  public saveUpdateCom(): void {
    this.serviceCom.UpdateComentariu(this.comEditForm.value).subscribe(
      (result) => {
        console.log("rez", result);
        this.modalService.dismissAll();
        this.getPoza(this.nenulEmail());
         this.getPostariViewByMe(this.nenulEmail());
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteCom(codComentariu: number) {
    this.serviceCom.deleteComentariu(codComentariu).subscribe(
      () => {
        this.modalService.dismissAll();
        this.getPoza(this.nenulEmail());
         this.getPostariViewByMe(this.nenulEmail());
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public reactiiFericireTristete = {
    reactieFericire: false,
    reactieTristete: false
  }

  public antrenorId = {
    nume: 'default nume',
    prenume: 'default prenume',
    gradPregatire: 'default pregatire',
    urlPozaProfil: 'default poza',
    numeClub: 'default club',
    email: 'default email',
  };
  public newReactie: ReactiePostareCreateModel = {
    emailUtilizator: 'default email',
    codPostare: 0,
    reactieFericire: false,
    reactieTristete: false
  };

  public reactieTristUpdate: ReactiePostareUpdateTristeteModel = {
    emailUtilizator: 'default email',
    codPostare: 0,
    reactieTristete: false
  }

  public reactieFericitUpdate: ReactiePostareUpdateFericireModel = {
    emailUtilizator: 'default email',
    codPostare: 0,
    reactieFericire: false
  }

  public tristetea(codPostare: number): void {
    //a apasat pe butonul de tristete
    //1. trebuie verificat daca exista in baza de date o intrare cu acest codPostare si email
    if (this.nenulEmail() !== "") {
      this.serviceReactii.GetReactiiForUserPostare(this.nenulEmail(), codPostare).subscribe(
        (result) => {
          console.log("GetReactiiForUserPostare", result);
          this.reactiiFericireTristete = result;


          if (this.reactiiFericireTristete == null) //daca nu a reactionat pana acum la aceasta postare
          {
            console.log("aici");
            this.newReactie.emailUtilizator = this.nenulEmail();
            this.newReactie.codPostare = codPostare;
            this.newReactie.reactieFericire = false;
            this.newReactie.reactieTristete = true;
            console.log(this.newReactie);
            this.serviceReactii.createReactiePostare(this.newReactie).subscribe(
              (result) => {
                console.log(result);

                this.servicePost.UpdateTristeteCresc(codPostare).subscribe(
                  (result) => {
                    console.log(result);
                    const post = this.postariVazuteUtiliz.find(post => post.codPostare === codPostare);

                    if (post) {
                     
                      this.serviceReactii.GetNrReactiiTristete(codPostare).subscribe(
                        (result) =>{
                          post.numarReactiiTristete = result;
                        },
                       (error) => {
                       console.log(error);
                        }
                      ); 
                      }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              },
              (error) => {
                console.log(error);
              }
            );
          }
          else if (this.reactiiFericireTristete.reactieFericire == false && this.reactiiFericireTristete.reactieTristete == false) {//daca are deselectate ambele variante,dar in trecut a votat

            this.reactieTristUpdate.emailUtilizator = this.nenulEmail();
            this.reactieTristUpdate.codPostare = codPostare;
            this.reactieTristUpdate.reactieTristete = true;

            this.serviceReactii.UpdateTristete(this.reactieTristUpdate).subscribe(
              (result) => {
                console.log(result);

                this.servicePost.UpdateTristeteCresc(codPostare).subscribe(
                  (result) => {
                    console.log(result);
                    const post = this.postariVazuteUtiliz.find(post => post.codPostare === codPostare);

                    if (post) {
                     
                      this.serviceReactii.GetNrReactiiTristete(codPostare).subscribe(
                        (result) =>{
                          post.numarReactiiTristete = result;                       
                          
                        },
                       (error) => {
                       console.log(error);
                        }
                      ); 
                      }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              },
              (error) => {
                console.log(error);
              }
            );
          }
          else if (this.reactiiFericireTristete.reactieTristete == true)//daca el are initial reactia cu tristete si a apasat tot pe ea
          {
            this.reactieTristUpdate.emailUtilizator = this.nenulEmail();
            this.reactieTristUpdate.codPostare = codPostare;
            this.reactieTristUpdate.reactieTristete = false;



            console.log("reactieTristUpdate", this.reactieTristUpdate);

            this.serviceReactii.UpdateTristete(this.reactieTristUpdate).subscribe(
              (result) => {
                console.log(result);

                this.servicePost.UpdateTristeteDesc(codPostare).subscribe(
                  (result) => {
                    console.log(result);
                    const post = this.postariVazuteUtiliz.find(post => post.codPostare === codPostare);

                    if (post) {
                     
                      this.serviceReactii.GetNrReactiiTristete(codPostare).subscribe(
                        (result) =>{
                          post.numarReactiiTristete = result;
                        },
                       (error) => {
                       console.log(error);
                        }
                      ); 
                      }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              },
              (error) => {
                console.log(error);
              }
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
      this.getPostariViewByMe(this.nenulEmail());
    }
  }


  public fericirea(codPostare: number): void {
    //a apasat pe butonul de tristete
    //1. trebuie verificat daca exista in baza de date o intrare cu acest codPostare si email
    if (this.nenulEmail() !== "") {
    this.serviceReactii.GetReactiiForUserPostare(this.nenulEmail(), codPostare).subscribe(
      (result) => {
        console.log(result);
        this.reactiiFericireTristete = result;


        if (this.reactiiFericireTristete == null) //daca nu a reactionat pana acum la aceasta postare
        {

          this.newReactie.emailUtilizator = this.nenulEmail();
          this.newReactie.codPostare = codPostare;
          this.newReactie.reactieFericire = true;
          this.newReactie.reactieTristete = false;

          this.serviceReactii.createReactiePostare(this.newReactie).subscribe(
            (result) => {
              console.log(result);

              this.servicePost.UpdateFericireCresc(codPostare).subscribe(
                (result) => {
                  console.log(result);

                  const post = this.postariVazuteUtiliz.find(post => post.codPostare === codPostare);

                  if (post) {
                   
                    this.serviceReactii.GetNrReactiiFericire(codPostare).subscribe(
                      (result) =>{
                        post.numarReactiiFericire = result;
                      },
                     (error) => {
                     console.log(error);
                      }
                    ); 
                    }

                },
                (error) => {
                  console.log(error);
                }
              );

            },
            (error) => {
              console.log(error);
            }
          );
        }
        else if (this.reactiiFericireTristete.reactieFericire == false && this.reactiiFericireTristete.reactieTristete == false) {//daca are deselectate ambele variante,dar in trecut a votat

          this.reactieFericitUpdate.emailUtilizator = this.nenulEmail();
          this.reactieFericitUpdate.codPostare = codPostare;
          this.reactieFericitUpdate.reactieFericire = true;

          this.serviceReactii.UpdateFericire(this.reactieFericitUpdate).subscribe(
            (result) => {
              console.log(result);

              this.servicePost.UpdateFericireCresc(codPostare).subscribe(
                (result) => {
                  console.log(result);


                  const post = this.postariVazuteUtiliz.find(post => post.codPostare === codPostare);

                  if (post) {
                   
                    this.serviceReactii.GetNrReactiiFericire(codPostare).subscribe(
                      (result) =>{
                        post.numarReactiiFericire = result;
                      },
                     (error) => {
                     console.log(error);
                      }
                    ); 
                    }


                },
                (error) => {
                  console.log(error);
                }
              );

            },
            (error) => {
              console.log(error);
            }
          );
        }
        else if (this.reactiiFericireTristete.reactieFericire == true)//daca el are initial reactia cu fericire si a apasat tot pe ea
        {
          this.reactieFericitUpdate.emailUtilizator = this.nenulEmail();
          this.reactieFericitUpdate.codPostare = codPostare;
          this.reactieFericitUpdate.reactieFericire = false;

          this.serviceReactii.UpdateFericire(this.reactieFericitUpdate).subscribe(
            (result) => {
              console.log(result);

              this.servicePost.UpdateFericireDesc(codPostare).subscribe(
                (result) => {
                  console.log(result);

                  const post = this.postariVazuteUtiliz.find(post => post.codPostare === codPostare);

                  if (post) {
                   
                    this.serviceReactii.GetNrReactiiFericire(codPostare).subscribe(
                      (result) =>{

                        post.numarReactiiFericire = result;
                      },
                     (error) => {
                     console.log(error);
                      }
                    ); 
                    }
                },
                (error) => {
                  console.log(error);
                }
              );
            },
            (error) => {
              console.log(error);
            }
          );
        }

      },
      (error) => {
        console.log(error);
      }
    );
    this.getPostariViewByMe(this.nenulEmail());
    }
  }


  onLogout() {
    this.serviceAuth.logout();
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }
  public getPoza(email: string): void {
    this.service.getUrlUtilizator(email).subscribe(
      (result) => {
        this.pozaProfil = result;
        console.log(this.pozaProfil);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  public getNrNotifNecitite(email: string): void {
    this.serviceNotif.GetNrNotifNecitite(email).subscribe(
      (result) => {
        this.nrNotifNecitite = result;
        console.log(this.nrNotifNecitite);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public logAntrenor() {
    const rol = localStorage.getItem('RoleId');
    if (rol !== null)
      this.logareRol = rol;

    if (this.logareRol === 'AntrenorUtilizator')
      return true;
    else
      return false;
  }

  public logSportiv() {
    const rol = localStorage.getItem('RoleId');
    if (rol !== null)
      this.logareRol2 = rol;

    if (this.logareRol2 === 'SportivUtilizator')
      return true;
    else
      return false;
  }


  public notific() {
    this.router.navigate(['notif/notificari', this.email]);
  }

  public postari() {
    this.router.navigate(['post/postari', this.email]);
  }
  public profilul(emailul: string, codAntrenor: string) {
    if (codAntrenor !== null)
      this.router.navigate(['sp/sportivid', emailul]);
    else
      this.router.navigate(['antr/antrenorIdView', emailul]);

  }

}
