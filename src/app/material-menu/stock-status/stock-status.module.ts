import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StockStatusPageRoutingModule } from './stock-status-routing.module';
import { StockStatusPage } from './stock-status.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockStatusPageRoutingModule
  ],
  declarations: [StockStatusPage]
})
export class StockStatusPageModule {}
