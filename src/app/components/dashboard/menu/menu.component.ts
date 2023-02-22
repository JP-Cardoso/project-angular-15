import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  messageHour!: string

  constructor() {

  }

  getMessageHour(message: string) {
    this.messageHour = message    
  }

}
