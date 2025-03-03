import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePricingComponent } from './update-pricing.component';

describe('UpdatePricingComponent', () => {
  let component: UpdatePricingComponent;
  let fixture: ComponentFixture<UpdatePricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePricingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
