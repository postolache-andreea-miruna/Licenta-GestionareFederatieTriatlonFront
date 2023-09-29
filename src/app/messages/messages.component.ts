import { Component, Input, OnInit } from '@angular/core';
import { Conversatie } from '../models/conversatie';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit{
  @Input() messages: Conversatie[] = [];
  hoveredMessage: any = null;

  emailul = localStorage.getItem('email');

  ngOnInit(): void {
    console.log(this.messages);
  }

}
