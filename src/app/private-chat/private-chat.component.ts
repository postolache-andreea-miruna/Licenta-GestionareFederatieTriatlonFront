import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Mesaj } from '../models/mesaj';
import { Online } from '../models/online';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit,OnDestroy {
 
  @Input() toUser: Online =
  {
    nume:'',
    prenume:'',
    email:'',
    disponibilitate:false
  };

  public mesaje: Mesaj[]=[];
  hoveredMessages: any = null;

  constructor(public activeModal: NgbActiveModal, public chatService: ChatService){}
  ngOnDestroy(): void {
    this.chatService.closePrivateChatMessage(this.toUser.email);
  }

  ngOnInit() {
      console.log("to user",this.toUser.nume);
      console.log("chatService.email",this.chatService);
      this.chatService.getLastConv(this.chatService.email,this.toUser.email).subscribe(
      (result: Mesaj[]) => {
        console.log("result",result);
        this.mesaje = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  sendMessage(content: string){
    var time = new Date();
    console.log("dataAct",time);
    this.chatService.sendPrivateMessage(this.toUser.email,content,time);
  }
  ngAfterViewChecked(){
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
}
