import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';
import { UpdateDebts } from 'src/app/interfaces/updateDebts';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-update-debs',
  templateUrl: './update-debs.component.html',
  styleUrls: ['./update-debs.component.scss']
})
export class UpdateDebsComponent {

  form!: FormGroup;
  category!: string;
  categories: Category[] = [
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
  month!: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private localStorage: LocalstorageService,
    private apiService: ApiService,
    private storeService: StoreService,
    private dialogRef: DialogRef<UpdateDebsComponent>
  ) {
    console.log(this.data);
    
    this.initForm();
    this.fillData();
    this.defineInitMonth();
    this.storeService.getStoreMonth().subscribe(res => {
      this.month = res
    })
  }

  initForm() {
    this.form = this.fb.group({
      debt: [null, Validators.required],
      category: [null, Validators.required],
      value: [null, Validators.required],
      expirationDate: [null, Validators.required]
    })
  }


  fillData() {
    if(this.data) {
      this.category = this.data.data?.category
      this.form.patchValue({
        debt: this.data.data?.debt,
        category: this.data.data?.category,
        value: this.data.data?.value,
        expirationDate: this.data.data?.expirationDate
      })
    }
  }


  submit() {
    const categoryInput = this.getValueControl(this.form, 'category');

    if(!categoryInput) {
      this.form.patchValue({
        category: this.category
      })
    }

    if(this.isValidForm()) {
      let debt = this.getValueControl(this.form, 'debt')
      let category = this.getValueControl(this.form, 'category')
      let value = this.getValueControl(this.form, 'value')
      let expirationDate = this.getValueControl(this.form, 'expirationDate')
      let user = this.localStorage.getLocalStorage('user')

      const payload = {
        user : {
          title: user,
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

      this.apiService.updateDebts(this.data.data._id, payload)
        .subscribe((res: UpdateDebts) => {
          this.storeService.setStoreDebts(true)
        })
    }
    this.dialogRef.close()
  }


  isValidForm(): boolean {
    return this.form.valid
  }

  getValueControl(form: FormGroup, control: string) {
    return form.controls[control].value
  }


  defineInitMonth() {
    let date = new Date();
    let dateString = date.toLocaleDateString('pt-br', {month: 'long'});
    let letterDateString = dateString[0].toUpperCase() + dateString.substring(1);

    this.month == undefined ? (this.month = letterDateString) : this.month 
    
  }

}
