import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { FirevabseService } from 'src/app/services/firevabse.service';
import { MenuSelectModalComponent } from './menu-select-modal/menu-select-modal.component';

@Component({
  selector: 'app-add-pairing-recipe',
  templateUrl: './add-pairing-recipe.page.html',
  styleUrls: ['./add-pairing-recipe.page.scss'],
  standalone: false
})
export class AddPairingRecipePage implements OnInit {
  setForm = new FormGroup({
    name: new FormControl('', Validators.required),
    priceInShop: new FormControl(0, [Validators.required, Validators.min(0)]),
    priceDelivery: new FormControl(0, [Validators.required, Validators.min(0)]),
    menuSelect: new FormControl([], Validators.required),
  });

  menuList: any[] = [];

  constructor(private db: FirevabseService, private nav: NavController, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.db.listenData('menus', (data: any) => {
      if (data) {
        this.menuList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
    });
  }

  saveSet() {
    const setData = {
      ...this.setForm.value,
      createdAt: Date.now()
    };

    this.db.pushData('menuSets', setData).then(() => {
      alert('เพิ่มเซ็ทเมนูเรียบร้อย');
      this.setForm.reset();
      this.nav.back()
    }).catch((error) => {
      alert(error)
    })
  }

  selectedMenus: any = [];
  async openMenuModal() {
    const modal = await this.modalCtrl.create({
      component: MenuSelectModalComponent,
      componentProps: {
        selectedIds: this.selectedMenus.map((m: any) => m.id),
      },
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.selectedMenus = res.data.menus;
        this.setForm.get('menuSelect')?.setValue(this.selectedMenus.map((m: any) => m.id));
      }
    });
    await modal.present();
  }

  sumMenu(type: string) {
    const total: any = this.selectedMenus.reduce((sum: any, m: any) => {
      sum.shop = sum.shop + m.priceInShop
      sum.delivery = sum.delivery + m.priceDelivery
      return sum
    }, { shop: 0, delivery: 0 });


    if (type === 'shop') {
      return total.shop ?? 0
    } else {
      return total.delivery ?? 0
    }
  }

  avgMenu() {

  }

  pofitShop: number = 0
  pofitDelivery: number = 0
  Cogs: any = 0
  calculateCost() {
    this.Cogs = 0
    const form: any = this.setForm.value;
    const menuCost: any = form.menuSelect.reduce((sum: any, m: any) => {
      sum.cogs = sum.cogs + (parseFloat(m.totalCost) / m.priceInShop) * 100
      sum.shop = sum.shop + m.priceInShop
      sum.delivery = sum.delivery + m.priceDelivery
      return sum
    }, { shop: 0, delivery: 0, cogs: 0 });
    this.pofitShop = this.setForm.value.priceInShop ?? 0 - menuCost.shop
    this.pofitDelivery = this.setForm.value.priceDelivery ?? 0 - menuCost.delivery
    this.Cogs = menuCost.cogs / form.menuSelect.length
  }
}
