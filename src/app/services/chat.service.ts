import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Conversatie } from '../models/conversatie';
import { PrivateChatComponent } from '../private-chat/private-chat.component';
import { Observable } from 'rxjs';
import { Mesaj } from '../models/mesaj';
import { Online } from '../models/online';
import { NumeUtilizatorChat } from '../models/numeUtilizatorChat';
import { PrenumeUtilizatorChat } from '../models/prenumeUtilizatorChat';
import { UserOnlineMessages } from '../models/userOnlineMessages';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  email: string='';
  
  private chatConnection?: HubConnection;
  onlineUsers: string[] = [];
  usersOnline: Online[] =[];
  usersOffline: Online[] =[];//offline

  usersOnlineMessages: UserOnlineMessages[] =[];

  privateMessages: Conversatie[]=[];
  privateMessageInitiated = false;

  public nume={
    nume:''
  }
  public prenume={
    prenume:''
  }
  constructor(private httpClient: HttpClient, private modalService: NgbModal) { }

  public apiUrl = 'https://localhost:7004';
  public apiUrl1 = 'https://localhost:7004/api/Chat';

  public getLastConv(emailUtiliz: string, emailUtiliz2: string): Observable<Mesaj[]> 
  {
    return this.httpClient.get<Mesaj[]>(`${this.apiUrl1}/mesaje/${emailUtiliz}/${emailUtiliz2}`);
  }

  public getNumeUtiliz(emailUtiliz:string):Observable<NumeUtilizatorChat>
  {
    return this.httpClient.get<NumeUtilizatorChat>(`${this.apiUrl1}/nume/${emailUtiliz}`);
  }

  public nrMesajeNecititeTotal(emailUtiliz:string):Observable<number>
  {
    return this.httpClient.get<number>(`${this.apiUrl1}/mesajeNecitite/${emailUtiliz}`);
  }

  public getPrenumeUtiliz(emailUtiliz:string):Observable<PrenumeUtilizatorChat>
  {
    return this.httpClient.get<PrenumeUtilizatorChat>(`${this.apiUrl1}/prenume/${emailUtiliz}`);
  }

  public updateDispo(emailUtiliz: string, disponibilitate: boolean): Observable<any>{
    return this.httpClient.put(`${this.apiUrl1}/editDispo/${emailUtiliz},${disponibilitate}`,disponibilitate);
  }

  createConnection(){
    this.chatConnection = new HubConnectionBuilder()
    .withUrl(`${this.apiUrl}/hubs/chat`)
    .withAutomaticReconnect()
    .build();

    this.chatConnection.start().catch(error=>{
      console.log(error);      
    });

    this.chatConnection.on('ConnectedUser', () => {
      this.connectionIdForUser();
      this.utilizatoriAndUnreadMessages();
    });

    this.chatConnection.on('OnlineUsers', (usersOnline) => {
      this.usersOnline = [...usersOnline];

    });

    this.chatConnection.on('OfflineUsers', (usersOffline) => {
      this.usersOffline = [...usersOffline];

    });

  
    this.chatConnection?.on('UsersMessagesNr', utilizOnMessages => {
       
      this.usersOnlineMessages = [...utilizOnMessages];
     

    });

    this.chatConnection.on('OpenPrivateChat', (newMessage: Conversatie) => {
     
      this.privateMessageInitiated = true;
      const modalRef = this.modalService.open(PrivateChatComponent,{centered:true});
      
      modalRef.componentInstance.toUser.email = newMessage.codUtilizator; //se face initializarea lui toUser


      this.getNumeUtiliz(modalRef.componentInstance.toUser.email).subscribe(
        (result) => {
          console.log(result);
          this.nume = result;

          modalRef.componentInstance.toUser.nume = this.nume.nume;

        },
        (error) => {
          console.log(error);
        }
      );
      
      this.getPrenumeUtiliz(modalRef.componentInstance.toUser.email).subscribe(
        (result) => {
          this.prenume = result;
          modalRef.componentInstance.toUser.prenume = this.prenume.prenume;
        },
        (error) => {
          console.log(error);
        }
      );
  
    });

    this.chatConnection.on('NewPrivateMessage', (newMessage: Conversatie) => {
      this.privateMessages = [...this.privateMessages, newMessage];
    });

    this.chatConnection.on('ClosePrivateChat', () => {
      this.privateMessageInitiated = false;
      this.privateMessages =[];
      this.utilizatoriAndUnreadMessages();
      this.modalService.dismissAll();
    });
  }

  stopChatConnection() {
    this.chatConnection?.stop().catch(error=>console.log(error));
  }

  async connectionIdForUser(){//aici ar trebui sa ia email si sa schimbe prin baza de date ca sa ii puna conexiunea aferenta userului
    return this.chatConnection?.invoke('ConnectionIdForUser',this.email)
    .catch(error=>{console.log(error);});
    
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async utilizatoriAndUnreadMessages(){
    return this.chatConnection?.invoke('UtilizatoriAndUnreadMessages',this.email).catch(error=>{console.log(error);});
  }

  async sendPrivateMessage(codUtilizator2:string, mesajConversatie: string, dataTrimitereMesaj: Date){
    
    const message: Conversatie = {
      codUtilizator: this.email,
      codUtilizator2,
      mesajConversatie,
      dataTrimitereMesaj
    };

    if(!this.privateMessageInitiated){
      this.privateMessageInitiated = true;
      return this.chatConnection?.invoke('CreatePrivateChat',message).then(()=>{
        this.privateMessages = [...this.privateMessages, message];
      })
      .catch(error=>{
        console.log(error);      
      });
    }
    else{
      return this.chatConnection?.invoke('ReceivePrivateMessage',message)
    .catch(error=>{
      console.log(error);      
    });
    }
  }

  async closePrivateChatMessage(otherUser: string){
    return this.chatConnection?.invoke('ClosePrivateChat', this.email, otherUser)
    .catch(error=>{console.log(error);});
  }

}
