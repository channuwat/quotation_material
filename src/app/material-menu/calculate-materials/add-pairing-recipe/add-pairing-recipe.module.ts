import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPairingRecipePageRoutingModule } from './add-pairing-recipe-routing.module';

import { AddPairingRecipePage } from './add-pairing-recipe.page';
import { MenuSelectModalComponent } from './menu-select-modal/menu-select-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddPairingRecipePageRoutingModule
  ],
  declarations: [AddPairingRecipePage,MenuSelectModalComponent]
})
export class AddPairingRecipePageModule {}
