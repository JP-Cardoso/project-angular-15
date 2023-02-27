import { Component } from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-balance-total-card',
  templateUrl: './balance-total-card.component.html',
  styleUrls: ['./balance-total-card.component.scss']
})
export class BalanceTotalCardComponent {

  totalRevenues!: number;
  totalDebts!: number;
  hasPositive = true;
  hasnegative = true;
  balanceTotal: any;
  showBalanceTotal: any;

  constructor(
    private storeService: StoreService

  ) {
    this.getRevenuesTotal();
    this.getDebtsTotal();    
  }

  getRevenuesTotal() {
    this.storeService.getRevenuesTotal().subscribe(res => {
      this.totalRevenues = res      
      if(this.totalRevenues !== null) {
        this.getBalanceTotal()        
      }
    })
  }

  getDebtsTotal() {
    this.storeService.getDebtsTotal().subscribe(res => {
      this.totalDebts = res 
      if(this.totalDebts !== null) {
        this.getBalanceTotal()
      }
    })
  }

  getBalanceTotal() {   
    this.storeService.getBalanceTotal().subscribe(res => {
      if(res) {   
        if(this.totalDebtGreaterThanIncome()) {
          const result = this.totalDebts - this.totalRevenues;
          this.hasPositive = true;
          this.hasnegative = false;        
          this.totalDebtMinusIncome(result)
          console.log(result);
          
        }
      }
    })
  }

  totalDebtGreaterThanIncome(): boolean {
    if(this.totalDebts > this.totalRevenues) {
      return true;
    } else {
      return false;
    }
  }

  totalDebtLessThanIncome(): boolean {
    if(this.totalDebts < this.totalRevenues) {
      return true;
    } else {
      return false;
    }
  }

  totalEqualsZero(): boolean {
    if(this.totalDebts === 0 && this.totalRevenues === 0) {
      return true
    } else {
      return false
    }
  }

  totalDebtMinusIncome(result: number) {
    this.balanceTotal = {
      title: 'Saldo Total',
      value: result
    }
    console.log('opa');
    
    this.showBalanceTotal =  this.balanceTotal;
    console.log(this.showBalanceTotal);
    
  }


}
