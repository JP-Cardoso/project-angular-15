import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { RegisterDebts } from 'src/app/interfaces/registerDebts';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { StoreService } from 'src/app/shared/store.service';
import { AddRevenuesComponent } from '../add-revenues/add-revenues.component';

@Component({
  selector: 'app-add-debts',
  templateUrl: './add-debts.component.html',
  styleUrls: ['./add-debts.component.scss']
})
export class AddDebtsComponent {

  form!: FormGroup;
  category!: string;
  categories!: Category[];
  months: string[] = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  month!: string

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalstorageService,
    private storeService: StoreService,
    private dialogRef: DialogRef<AddRevenuesComponent>,
    private apiService: ApiService
  ) {
    this.initForm()
    this.categories = [
      {
        name:'Casa'
      }, {
        name:'Eletrodomesticos'
      },
      {
        name:'Saúde'
      },
      {
        name:'Entreterimento'
      },
      {
        name:'Estudo'
      },
      {
        name:'Outros'
      }
    ]

    this.storeService.getStoreMonth().subscribe(res => {
      this.month = res
    })
  }

  initForm() {
    this.form = this.fb.group({
      debt: [null, Validators.required],
      category: [null, Validators.required],
      value: [null, Validators.required],
      expirationDate: [null, Validators.required],
      fixedDebt: [null]
    })
  }


  submit() {
    this.form.patchValue({
      category: this.category
    })
    
    if(this.isValidForm()) {      
      let debt = this.getValueControl(this.form, 'debt');
      let category = this.getValueControl(this.form, 'category');
      let value = this.getValueControl(this.form, 'value');
      let user = this.localStorageService.getLocalStorage('user')

      const date = this.getValueControl(this.form, 'expirationDate');
      
      const dataReplace = date
        .replaceAll('-', '$')
        .replaceAll('-', '$')
        .split('$')
      let fixedMonth = Number(dataReplace[1]-1 )     
      let newDate = new Date(dataReplace[0], fixedMonth, dataReplace[2]);

      const monthDateSelected = newDate.toLocaleDateString('pt-br', {
        month: 'long'
      })

      const convertUppercase = monthDateSelected[0].toUpperCase() + monthDateSelected.substring(1)

      let indexMonthCurrent = this.searchIndexMonth(convertUppercase);
      let expirationDate = new Date(dataReplace[0], indexMonthCurrent, dataReplace[2]);

      console.log(expirationDate);
      
      const payload = { 
        user: {
          title: user,
          date:new Date(),
          month: {
            title: this.month,
            listMonth: {
              debt,
              category,
              value,
              expirationDate
            }
          }
        }
      } 
      
      if(this.getValueControl(this.form, 'fixedDebt')) {
        for(let i = 0; i < this.months.length; i++){
          expirationDate = new Date(dataReplace[0], this.searchIndexMonth(this.months[i]), dataReplace[2])

          const payload = {
            user: {
              title: user,
              date: new Date(),
              month: {
                title: this.months[i],
                listMonth: {
                  debt,
                  category,
                  value,
                  expirationDate
                }
              }
            }
          }

          this.apiService.registerDebts(payload)
            .subscribe()                    
        }
        this.storeService.setStoreDebts(true)
        this.dialogRef.close();  
        return
      }

      this.apiService.registerDebts(payload)
        .subscribe((res: RegisterDebts) => {
          if(res) {
            this.storeService.setStoreDebts(true)
          }          
        })

        this.dialogRef.close();

      
    }

  }
  searchIndexMonth(monthSearch: any) {
    let index = this.months.findIndex((month) => {
      return month === monthSearch;
    })

    return index;
  }

  isValidForm(): boolean {
    return this.form.valid
  }

  getValueControl(form: FormGroup, control: string) {
    return form.controls[control].value
  }

}
