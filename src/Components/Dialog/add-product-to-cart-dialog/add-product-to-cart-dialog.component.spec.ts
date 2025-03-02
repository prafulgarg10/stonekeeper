import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductToCartDialogComponent } from './add-product-to-cart-dialog.component';

describe('AddProductToCartDialogComponent', () => {
  let component: AddProductToCartDialogComponent;
  let fixture: ComponentFixture<AddProductToCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductToCartDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProductToCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
