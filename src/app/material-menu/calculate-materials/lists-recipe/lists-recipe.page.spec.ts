import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListsRecipePage } from './lists-recipe.page';

describe('ListsRecipePage', () => {
  let component: ListsRecipePage;
  let fixture: ComponentFixture<ListsRecipePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
