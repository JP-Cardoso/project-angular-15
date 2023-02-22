import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  messageHour!: string;
  showNameUser!: string;

  constructor(
    private localStorageService: LocalstorageService
  ) {
    
    this.getNameUser()
  }

  getMessageHour(message: string) {
    this.messageHour = message    
  }

  getNameUser() {
    const nameUser = this.localStorageService.getLocalStorage('userInfo');
    this.showNameUser = nameUser.name
  }
}
