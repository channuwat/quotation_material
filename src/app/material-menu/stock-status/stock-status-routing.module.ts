import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockStatusPage } from './stock-status.page';


const routes: Routes = [
  {
    path: '',
    component: StockStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockStatusPageRoutingModule {}
