import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialMenuPage } from './material-menu.page';

describe('MaterialMenuPage', () => {
  let component: MaterialMenuPage;
  let fixture: ComponentFixture<MaterialMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
