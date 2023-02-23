import { ApiService } from './../../../services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { StoreService } from './../../../shared/store.service';
import { MatDialog } from '@angular/material/dialog';
import { AddRevenuesComponent } from './../add-revenues/add-revenues.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ListRevenues } from 'src/app/interfaces/listRevenues';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss']
})
export class RevenuesComponent implements AfterViewInit{
  
  monthSelected!: string;
  user!: string;
  loading = false;
  emptyResult = false;
  arrRevenues: any[] = []

  public dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'tipoReceita',
    'valor',
    'dataEntrada',
    '_id',
    'acoes'
  ]
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private storeService: StoreService,
    private localStorageService: LocalstorageService,
    private apiService: ApiService,
    ) {
    this.storeService.getStoreRegisterRevenues().subscribe(res => {
      if(res) {
        this.getResgisterRevenues(this.monthSelected)
      }
    })

    this.storeService.getStoreMonth().subscribe(res => {
      this.monthSelected = res
    })
  }

  ngAfterViewInit() {
    this.getResgisterRevenues(this.monthSelected)

  }

  getResgisterRevenues(monthSelected: string) {
    this.user = this.localStorageService.getLocalStorage('user');
    this.apiService.getRegisterrevenues(monthSelected, this.user)
      .subscribe((res:ListRevenues) => {
        this.loading = true;
        let arr: any[] = [];

        if(res.result.length === 0) {
          this.emptyResult = true;
          this.arrRevenues = []
        
        } else {
          this.emptyResult = false;
          this.arrRevenues = arr;
        
          setTimeout(() => {
            this.dataSource.paginator = this.paginator
          }, 2001);
          res.result.forEach((element: any) => {
            arr.push(element.user.month.listMonth)
          })
        }

        setTimeout(() => {
          this.dataSource.data = arr;
          this.dataSource.paginator = this.paginator;
          this.loading = false;
          console.log('arr -->', arr);
          
        }, 2000)

      })
  }

  openDialog() {
    this.dialog.open(AddRevenuesComponent, {
      width: '600px',
      data: {
        any: ''
      }
    })
  }
}
