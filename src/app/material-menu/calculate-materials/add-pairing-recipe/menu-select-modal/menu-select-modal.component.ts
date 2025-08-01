import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FirevabseService } from 'src/app/services/firevabse.service';

@Component({
  selector: 'app-menu-select-modal',
  templateUrl: './menu-select-modal.component.html',
  styleUrls: ['./menu-select-modal.component.scss'],
  standalone: false
})
export class MenuSelectModalComponent implements OnInit {

  menuList: any[] = [];
  selectedIds: string[] = [];

  constructor(private modalCtrl: ModalController, private db: FirevabseService, private navParams: NavParams) {
    this.selectedIds = this.navParams.get('selectedIds') || [];
  }

  ngOnInit() {
    this.db.listenData('menus', (data: any) => {
      if (data) {
        this.menuList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          selected: this.selectedIds.includes(key),
        }));
      }
    });
  }

  toggleSelect(data: any) {
    let toggle: any = data.selected == false ? true : data.selected ? false : false
    data.selected = toggle
  }

  confirm() {
    const selectedMenus : any[] = []
    this.menuList.forEach((m: any) => {
      if (m.selected) {
        selectedMenus.push(m)
      }
    });

    this.modalCtrl.dismiss({ menus: selectedMenus });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
