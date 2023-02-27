import { Component } from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-debts-card',
  templateUrl: './debts-card.component.html',
  styleUrls: ['./debts-card.component.scss']
})
export class DebtsCardComponent {

  balanceDebts!: any

  constructor(
    private storeService: StoreService
  ) {

    this.getBalanceDebtsTotal()
  }

  getBalanceDebtsTotal() {
    this.storeService.getBalanceDebtsTotal().subscribe(res => {
      if(res) {
        this.createDebts(res);
        this.storeService.setDebtsTotal(res.data.total);
        this.storeService.setBalanceTotal(true);
      }
    })
  }

  createDebts(debts: any) {
    const totalDebts = {
      title: debts.data.title,
      value: debts.data.total
    }
    this.balanceDebts = totalDebts;    
  }

}
