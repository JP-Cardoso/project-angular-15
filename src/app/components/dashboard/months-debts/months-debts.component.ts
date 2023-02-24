import { Component } from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-months-debts',
  templateUrl: './months-debts.component.html',
  styleUrls: ['./months-debts.component.scss']
})
export class MonthsDebtsComponent {

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
    this.storeService.setSearchDebtsByMonth(true);
  }

  next() {
    this.findIndexElement();
    this.index += 1;
    this.index %= this.months.length;
    this.month = this.months[this.index];
    this.storeService.setStoreMonth(this.months[this.index]);
    this.storeService.setSearchDebtsByMonth(true);
  }

}
