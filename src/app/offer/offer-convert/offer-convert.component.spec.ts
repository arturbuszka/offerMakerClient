import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferConvertComponent } from './offer-convert.component';

describe('OfferConvertComponent', () => {
  let component: OfferConvertComponent;
  let fixture: ComponentFixture<OfferConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferConvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
