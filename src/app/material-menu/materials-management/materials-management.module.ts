import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { MaterialsManagementPageRoutingModule } from './materials-management-routing.module';
import { MaterialsManagementPage } from './materials-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialsManagementPageRoutingModule
  ],
  declarations: [MaterialsManagementPage]
})
export class MaterialsManagementPageModule {}
