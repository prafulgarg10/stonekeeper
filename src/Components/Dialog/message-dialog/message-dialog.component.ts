import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-message-dialog',
    imports: [MatIconModule],
    templateUrl: './message-dialog.component.html',
    styleUrl: './message-dialog.component.css'
})
export class MessageDialogComponent implements OnInit {
  public boxTitle: string = '';
  public message: string = '';
  constructor(private dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {boxTitle: string, message: string}){
  }

  ngOnInit(){
    this.boxTitle = this.data.boxTitle;
    this.message = this.data.message; 
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
