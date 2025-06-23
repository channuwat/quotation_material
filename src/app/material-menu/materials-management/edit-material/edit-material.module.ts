import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMaterialPageRoutingModule } from './edit-material-routing.module';

import { EditMaterialPage } from './edit-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditMaterialPageRoutingModule
  ],
  declarations: [EditMaterialPage]
})
export class EditMaterialPageModule {}
