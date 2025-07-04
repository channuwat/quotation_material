import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListsPairingRecipePage } from './lists-pairing-recipe.page';

describe('ListsPairingRecipePage', () => {
  let component: ListsPairingRecipePage;
  let fixture: ComponentFixture<ListsPairingRecipePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsPairingRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
