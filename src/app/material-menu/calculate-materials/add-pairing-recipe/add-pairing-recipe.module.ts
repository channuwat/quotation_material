import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPairingRecipePageRoutingModule } from './add-pairing-recipe-routing.module';

import { AddPairingRecipePage } from './add-pairing-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPairingRecipePageRoutingModule
  ],
  declarations: [AddPairingRecipePage]
})
export class AddPairingRecipePageModule {}
