import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Material, Price } from '../../model/product.model';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MessageDialogComponent } from '../Dialog/message-dialog/message-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppService } from '../../service/app.service';
import { FileUploadComponent } from '../Common/file-upload/file-upload.component';

@Component({
    selector: 'app-update-pricing',
    imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatDialogModule, MessageDialogComponent, FileUploadComponent],
    templateUrl: './update-pricing.component.html',
    styleUrl: './update-pricing.component.css'
})
export class UpdatePricingComponent implements OnChanges{
  @Input() latestMaterialsPrice: Price[] = [];
  @Input() materials: Material[] = [];
  private apiUrl = environment.apiUrl;

  updatePricing = new FormGroup({
    materialId: new FormControl(0),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    lastUpdated: new FormControl('')
  });

  constructor(private dialog: MatDialog, private http: HttpClient, private appService: AppService){}

  addLatestMaterialPriceToDB(){
    let lPrice = this.updatePricing.value as Price;
    lPrice.lastUpdated = new Date();
    let postData = Object.assign({}, lPrice as Price);
    this.http.post(this.apiUrl + '/add-pricing', postData, {headers: this.appService.currentHeader.value}).subscribe({
        next: data => {
            if(data){
              console.log("result", data);
              this.openDialog('Price Updated Successfully.', 'Confirmation!');
              this.appService.getLatestMaterialsPriceFromDB();
            }
        },
        error: err => { 
            console.log("Error", err);
            this.openDialog('Problem updating price. Please try again later.', 'Failure!');
        }
    })
  }

  openDialog(msg: string, title: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data:{
        message: msg,
        boxTitle: title
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['materials'] && this.materials.length>0){
      this.updatePricing.get('materialId')?.setValue(this.materials[0].id);
      this.onMaterialChange();
    }
    if(changes['latestMaterialsPrice']){
      this.onMaterialChange();
    }
  }

  onMaterialChange(){
    let materialId = this.updatePricing.get('materialId')?.value;
    let filteredLatestPrice = this.latestMaterialsPrice.filter(p => p.materialId==materialId);
    if(filteredLatestPrice && filteredLatestPrice.length>0){
      this.updatePricing.get('price')?.setValue(filteredLatestPrice[0].price);
      let formattedDate = new Date(filteredLatestPrice[0].lastUpdated).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      this.updatePricing.get('lastUpdated')?.setValue(formattedDate.toString());
    }
    else{
      this.updatePricing.get('price')?.setValue(0);
      this.updatePricing.get('lastUpdated')?.setValue("");
    }
  }

}

