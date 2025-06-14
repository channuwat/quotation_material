import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddMaterialComponent } from './add-material.component';



@NgModule({
  declarations: [AddMaterialComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ]
})
export class AddMaterialModule { }
