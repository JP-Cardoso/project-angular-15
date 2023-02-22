import { MatDialog } from '@angular/material/dialog';
import { AddRevenuesComponent } from './../add-revenues/add-revenues.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.scss']
})
export class RevenuesComponent {

  constructor(
    private dialog: MatDialog
  ) {
    
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
