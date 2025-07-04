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
    price: new FormControl(0, Validators.required),
    menuIds: new FormControl([], Validators.required),
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
        this.setForm.get('menuIds')?.setValue(this.selectedMenus.map((m: any) => m.id));
      }
    });

    await console.log(this.setForm);
    
    await modal.present();
  }
}
