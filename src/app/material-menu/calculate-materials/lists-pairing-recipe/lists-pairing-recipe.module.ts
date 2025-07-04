import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListsPairingRecipePageRoutingModule } from './lists-pairing-recipe-routing.module';

import { ListsPairingRecipePage } from './lists-pairing-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsPairingRecipePageRoutingModule
  ],
  declarations: [ListsPairingRecipePage]
})
export class ListsPairingRecipePageModule {}
