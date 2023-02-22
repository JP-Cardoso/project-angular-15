import { StoreService } from './../../../shared/store.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-months-revenues',
  templateUrl: './months-revenues.component.html',
  styleUrls: ['./months-revenues.component.scss']
})
export class MonthsRevenuesComponent {

  month!: string

  constructor(
    private storeService: StoreService
  ) {
    this.getMonthCurrent()
  }

  getMonthCurrent() {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', {month: 'long'});
    let letterDateString = dateString[0].toUpperCase() + dateString.substring(1)
    
    this.month = letterDateString

    this.storeService.setStoreMonth(this.month)
  }
}
