import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListsRecipePageRoutingModule } from './lists-recipe-routing.module';

import { ListsRecipePage } from './lists-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsRecipePageRoutingModule
  ],
  declarations: [ListsRecipePage]
})
export class ListsRecipePageModule {}
