import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPairingRecipePage } from './add-pairing-recipe.page';

describe('AddPairingRecipePage', () => {
  let component: AddPairingRecipePage;
  let fixture: ComponentFixture<AddPairingRecipePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPairingRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
