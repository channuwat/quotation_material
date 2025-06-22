import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialMenuPageRoutingModule } from './material-menu-routing.module';

import { MaterialMenuPage } from './material-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialMenuPageRoutingModule
  ],
  declarations: [MaterialMenuPage]
})
export class MaterialMenuPageModule {}
