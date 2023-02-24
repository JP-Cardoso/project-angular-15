import { StoreService } from './../../../shared/store.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-months-revenues',
  templateUrl: './months-revenues.component.html',
  styleUrls: ['./months-revenues.component.scss']
})
export class MonthsRevenuesComponent {

  month!: string;
  arrowLeft = '../../../../assets/image/arrow-left.png' ;
  arrowRight = '../../../../assets/image/arrow-right.png';
  months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
  index!: number;

  constructor(
    private storeService: StoreService
  ) {
    this.getMonthCurrent()
  }

  findIndexElement() {
    let returnIndex = this.months.findIndex(item => item === this.month);
    this.index = returnIndex;
    console.log(returnIndex);
    
  }

  getMonthCurrent() {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', {month: 'long'});
    let letterDateString = dateString[0].toUpperCase() + dateString.substring(1)
    
    this.month = letterDateString

    this.storeService.setStoreMonth(this.month)
  }

  prev() {
    this.findIndexElement();
    this.index += 1;
    this.index %= this.months.length;
    this.month = this.months[this.index];
    this.storeService.setStoreMonth(this.months[this.index]);
    this.storeService.setSearchRevenuesByMonth(true);
    this.storeService.setSearchDebtsByMonth(true)
  }

  next() {
    this.findIndexElement();
    this.index += 1;
    this.index %= this.months.length;
    this.month = this.months[this.index];
    this.storeService.setStoreMonth(this.months[this.index]);
    this.storeService.setSearchRevenuesByMonth(true);
  }

}
