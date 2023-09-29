import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PostareByEmailUtilizModel } from 'src/app/models/postareByEmailUtilizModel';
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
  selector: 'app-postari-utilizator-other-view',
  templateUrl: './postari-utilizator-other-view.component.html',
  styleUrls: ['./postari-utilizator-other-view.component.scss']
})
export class PostariUtilizatorOtherViewComponent implements OnInit{
  hasToken = false;
  logareRol = "";
  logareRol2 = "";
  email = localStorage.getItem('email'); //pentru userul logat
  nrNotifNecitite=0;

  postariUtiliz: PostareByEmailUtilizModel[]=[];

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
    private servicePost: PostariService,
    private modalService: NgbModal,
    private serviceCom: ComentariiService,
    private route: ActivatedRoute,
    private serviceReactii: ReactiipostareService
  ) { }

  public sub: Subscription = new Subscription;
  public emailul: string | undefined;
  
  public emailAntr: string | undefined;

  ngOnInit() {
    let clickulTrist = localStorage.getItem('clickTrist');
    if (clickulTrist !== null) {
      localStorage.setItem('clickTrist', clickulTrist);
    }


    let clickulF = localStorage.getItem('clickF');
    if (clickulF !== null) {
      localStorage.setItem('clickF', clickulF);
    }

    const token = localStorage.getItem('token');
    if (token !== null) {
      this.hasToken = true;
      this.validToken(token);
    }

    this.sub = this.route.params.subscribe(params => {
      this.emailul = params['emailul'];
      if (this.emailul) {
        this.getPostari(this.emailul);
        this.getPoza(this.nenulEmail());
      }
      this.emailAntr = params['email'];
      if (this.emailAntr) {
        this.getPostari(this.emailAntr);
        this.getPoza(this.nenulEmail());
      }
    });  

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
  onLogout() {
    this.serviceAuth.logout();
   setTimeout(function () {
    window.location.reload();
  }, 1000);
  }
  public getPostari(email:string){
    console.log("email",this.emailul)
    console.log("email",this.emailAntr)
    this.servicePost.GetPostariByEmail(email).subscribe(
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

        this.postariUtiliz = result;
        console.log(this.postariUtiliz);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  postariSelectate = new Map<number, boolean>();
  public comentarii(cod:number){//prima data este undefined, dupa alterneaza true/false
  console.log("cod",cod);
  const valCurenta = this.postariSelectate.get(cod);
  console.log(this.postariSelectate.get(cod));
  this.postariSelectate.set(cod, !valCurenta);
  }

  public comentariuAddForm: FormGroup = new FormGroup({
    codPostare: new FormControl(''),
    mesajComentariu: new FormControl(''),
    emailUtilizatorComentariu: new FormControl(''),
  });

  public saveCom(cod:number):void{//codPostare
    this.comentariuAddForm.get('codPostare')?.setValue(cod);
    this.comentariuAddForm.get('emailUtilizatorComentariu')?.setValue(this.email);

    this.serviceCom.createComentariu(this.comentariuAddForm.value).subscribe(
      (result) =>{
        console.log(result);
        this.sub = this.route.params.subscribe(params => {
          this.emailul = params['emailul'];
          if (this.emailul) {
            this.getPostari(this.emailul);
            this.getPoza(this.nenulEmail());
          }
          this.emailAntr = params['email'];
          if (this.emailAntr) {
            this.getPostari(this.emailAntr);
            this.getPoza(this.nenulEmail());
          }
        });  

        this.comentariuAddForm.get('mesajComentariu')?.setValue('');

      },
      (error) => {
        console.log(error);
      }
    );
  }

  public comEditForm: FormGroup = new FormGroup({
    mesajComentariu : new FormControl(''),
    codComentariu: new FormControl(0)
  });

  public editComentariu(codComentariu:number,contentEdit: any,text:string){
    this.modalService.open(contentEdit, { centered: true });

    this.comEditForm.get('mesajComentariu')?.setValue(text);
    this.comEditForm.get('codComentariu')?.setValue(codComentariu);
  }

  public saveUpdateCom(): void{
    this.serviceCom.UpdateComentariu(this.comEditForm.value).subscribe(
      (result) =>{
        console.log("rez",result);
        this.modalService.dismissAll();

        this.sub = this.route.params.subscribe(params => {
          this.emailul = params['emailul'];
          if (this.emailul) {
            this.getPostari(this.emailul);
            this.getPoza(this.nenulEmail());
          }
          this.emailAntr = params['email'];
          if (this.emailAntr) {
            this.getPostari(this.emailAntr);
            this.getPoza(this.nenulEmail());
          }
        });  
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteCom(codComentariu: number){
    this.serviceCom.deleteComentariu(codComentariu).subscribe(
      () =>{
        this.modalService.dismissAll();
        this.sub = this.route.params.subscribe(params => {
          this.emailul = params['emailul'];
          if (this.emailul) {
            this.getPostari(this.emailul);
            this.getPoza(this.nenulEmail());
          }
          this.emailAntr = params['email'];
          if (this.emailAntr) {
            this.getPostari(this.emailAntr);
            this.getPoza(this.nenulEmail());
          }
        });  
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
                    const post = this.postariUtiliz.find(post => post.codPostare === codPostare);

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
                    const post = this.postariUtiliz.find(post => post.codPostare === codPostare);

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
                    const post = this.postariUtiliz.find(post => post.codPostare === codPostare);

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

      this.sub = this.route.params.subscribe(params => {
        this.emailul = params['emailul'];
        if (this.emailul) {
          this.getPostari(this.emailul);
        }
        this.emailAntr = params['email'];
        if (this.emailAntr) {
          this.getPostari(this.emailAntr);
        }
      });  
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

                  const post = this.postariUtiliz.find(post => post.codPostare === codPostare);

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


                  const post = this.postariUtiliz.find(post => post.codPostare === codPostare);

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

                  const post = this.postariUtiliz.find(post => post.codPostare === codPostare);

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
    this.sub = this.route.params.subscribe(params => {
      this.emailul = params['emailul'];
      if (this.emailul) {
        this.getPostari(this.emailul);
      }
      this.emailAntr = params['email'];
      if (this.emailAntr) {
        this.getPostari(this.emailAntr);
      }
    });  
    }
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
 
  
 
}
