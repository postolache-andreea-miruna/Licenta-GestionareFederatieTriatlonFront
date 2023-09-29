import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit{
content: string = '';
@Output() contentEmitter = new EventEmitter();
ngOnInit(): void{
}

sendMessage(){
  if(this.content.trim() !==""){
    this.contentEmitter.emit(this.content);
  }

  this.content = ''; //dupa ce userul da pe submit sa se goleasca inputul de content
}

}
