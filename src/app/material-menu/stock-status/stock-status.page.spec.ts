import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockStatusPage } from './stock-status.page';

describe('StockStatusPage', () => {
  let component: StockStatusPage;
  let fixture: ComponentFixture<StockStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
