import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private storeRegister = new BehaviorSubject<boolean>(false);
  private storeMonth = new BehaviorSubject<string>('');
  private storeRegisterDebts = new BehaviorSubject<boolean>(false);
  private searchRevenuesByMonth = new BehaviorSubject<boolean>(false);
  private searchDebtsByMonth = new BehaviorSubject<boolean>(false);
  private debtsPrev = new BehaviorSubject<boolean>(false);
  private debtsNext = new BehaviorSubject<boolean>(false);
  private revenuesPrev = new BehaviorSubject<boolean>(false);
  private revenuesNext = new BehaviorSubject<boolean>(false)


  constructor() { }

  setStoreMonth(value: string) {
    this.storeMonth.next(value);
  }

  getStoreMonth() {
    return this.storeMonth.asObservable();
  }

  setStoreRevenues(value: boolean) {
    this.storeRegister.next(value);
  }

  getStoreRevenues() {
    return this.storeRegister.asObservable();
  }

  setSearchRevenuesByMonth(value: boolean) {
    this.searchRevenuesByMonth.next(value)
  }

  getSearchRevenuesByMonth() {
    return this.searchRevenuesByMonth.asObservable();
  }

  setStoreDebts(value: boolean) {
    this.storeRegisterDebts.next(value)
  }

  getStoreDebts() {
    return this.storeRegisterDebts.asObservable();
  }

  setSearchDebtsByMonth(value: boolean) {
    this.searchDebtsByMonth.next(value)
  }

  getSearchDebtsByMonth() {
    return this.searchDebtsByMonth.asObservable();
  }

  setDebtsPrev(value: boolean) {
    this.debtsPrev.next(value)
  }

  getDebtsPrev() {
    return this.debtsPrev.asObservable();
  }

  setDebtsNext(value: boolean) {
    this.debtsNext.next(value)
  }

  getDebtsNext() {
    return this.debtsNext.asObservable();
  }

  setRevenuesPrev(store: boolean) {
    return this.revenuesPrev.next(store)
  }

  getRevenuesPrev() {
    return this.revenuesPrev.asObservable();
  }

  setRevenuesNext(store: boolean) {
    return this.revenuesNext.next(store)
  }

  getRevenuesNext() {
    return this.revenuesNext.asObservable();
  }


}
