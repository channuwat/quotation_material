import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsManagementPage } from './materials-management.page';

describe('MaterialsManagementPage', () => {
  let component: MaterialsManagementPage;
  let fixture: ComponentFixture<MaterialsManagementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
