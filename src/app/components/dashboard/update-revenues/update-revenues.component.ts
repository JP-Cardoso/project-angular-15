import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-update-revenues',
  templateUrl: './update-revenues.component.html',
  styleUrls: ['./update-revenues.component.scss']
})
export class UpdateRevenuesComponent {

  form!: FormGroup;
  typeRevenue!: string;
  categoties!: Category[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private document: any,
    private fb: FormBuilder 
  ) {
    console.log(this.data);
    this.initForm();
    this.fillData();
    this.categoties = [
      {
        name: 'Investimentos'
      },
      {
        name: 'Freelas'
      },
      {
        name: 'Férias'
      },
      {
        name: 'Outros'
      }
    ]
    // this.setStoreRevenuetFutureDate()
  }

  initForm() {
    this.form = this.fb.group({
      typeRevenue: [null, Validators.required],
      value: [null, Validators.required],
      dateEntry: [null, Validators.required]
    })
  }

  fillData() {
    if(this.data) {
      this.typeRevenue = this.data.data?.typeRevenue
      this.form.patchValue({
        typeRevenue: this.data.data?.typeRevenue,
        value: this.data.data?.value,
        dateEntry: this.data.data?.dateEntry
      })
    }
  }

  // setStoreRevenuetFutureDate() {
  //   const inputDate = this.document.querySelector('#dateEntry')

  //   let date = new Date();
  //   let month: any = date.getMonth() + 1;
  //   let day: any = date.getDate();
  //   let year = date.getFullYear();

  //   if(month < 10) {
  //     month = '0' + month.toString()
  //   }

  //   if(day < 10) {
  //     day = '0' + day.toString();
  //   }

  //   let maxDate = year + '-' + month + '-' + day
    
  //   console.log(inputDate)    
  //   inputDate.max = maxDate    
  // }

}
