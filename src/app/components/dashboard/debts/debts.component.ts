import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListDebts } from 'src/app/interfaces/listDebts';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { StoreService } from 'src/app/shared/store.service';
import { AddDebtsComponent } from '../add-debts/add-debts.component';
import { UpdateDebsComponent } from '../update-debs/update-debs.component';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss']
})
export class DebtsComponent implements AfterViewInit{

  user!: string;  
  loading = false;
  emptyResult = false;  
  arrDebts: any[] = [];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild('paginator') paginator!: MatPaginator;
  monthSelected!: string;
  displayedColums: string[] = [
    'divida', 'categoria', 'valor', 'dataVencimento', '_id', 'acoes'
  ]

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalstorageService,
    private apiService: ApiService,
    private storeService: StoreService

  ) {
    this.storeService.getStoreMonth().subscribe(res => {
      this.monthSelected = res
    })
    this.storeService.getStoreDebts().subscribe(res => {
      if(res) {
        this.getResgisterDebts(this.monthSelected)
      }
    })
    this.defineInitMonth()
  }

  openDialog() {
    this.dialog.open(AddDebtsComponent, {
      width: '600px'
    })
  }

  ngAfterViewInit() {
    this.getResgisterDebts(this.monthSelected);

    this.storeService.getSearchDebtsByMonth().subscribe(res => {
      if(res) {
        this.getResgisterDebts(this.monthSelected);

        setTimeout(() => {
          this.dataSource.paginator = this.paginator
        }, 3000)
      }
    })
  }

  getResgisterDebts(monthSelected: string) {
    this.user = this.localStorageService.getLocalStorage('user');
    this.apiService.getRegisterDebts(monthSelected, this.user)
      .subscribe((res:ListDebts) => {
        this.loading = true;
        let arr: any[] = [];

        if(res.result.length === 0) {
          this.emptyResult = true;
          this.arrDebts = []
        
        } else {
          this.emptyResult = false;
          this.arrDebts = arr;
        
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
          
        }, 2000)

      })
  }

  defineInitMonth() {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', {month: 'long'});
    let letterDateString = dateString[0].toUpperCase() + dateString.substring(1);

    this.monthSelected == undefined ? (this.monthSelected= letterDateString) : this.monthSelected
    
  }
  // faz busca
  applyFilter(event: any) {
    const filterValues = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValues.trim().toLocaleLowerCase();    
  }

  selectAction(action: string, element: any) {
    if(action.indexOf('edit.png') != -1) {
      this.dialog.open(UpdateDebsComponent, {
        width: '600px', 
        data: {
          data: element
        }
      })
    } else {
      const question = confirm('Tem certeza que deseja excluir essa Receita?')
      if(question) {
        this.apiService.deleteDebts(element._id)
          .subscribe((res: any) => {
            if(res) {
              this.storeService.setStoreDebts(true)
            }
          })
      }
    }
  }

}
