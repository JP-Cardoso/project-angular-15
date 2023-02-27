import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private apiService: ApiService,
    private localStorage: LocalstorageService
  ) {
    this.getUser()
  }

  getUser() {
    const {_id} = this.localStorage.getLocalStorage('userInfo')
 
    this.apiService.getUser(_id).subscribe(res => {
      
    })
  }


}
