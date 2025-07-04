import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirevabseService } from 'src/app/services/firevabse.service';

@Component({
  selector: 'app-lists-pairing-recipe',
  templateUrl: './lists-pairing-recipe.page.html',
  styleUrls: ['./lists-pairing-recipe.page.scss'],
  standalone: false
})
export class ListsPairingRecipePage implements OnInit {

  menus: any[] = [];

  constructor(private db: FirevabseService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus() {
    this.db.listenData('menus', (res) => {
      this.menus = [];
      for (const key in res) {
        this.menus.push({ id: key, ...res[key] });
      }
    })

  }

  async confirmDelete(recipeId: string) {
    const alert = await this.alertCtrl.create({
      header: 'ยืนยันการลบ',
      message: 'คุณแน่ใจว่าต้องการลบเมนูนี้หรือไม่?',
      mode: 'ios',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'ลบ',
          handler: () => {
            this.deleteRecipe(recipeId);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteRecipe(recipeId: string) {
    this.db.deleteData('menus/' + recipeId).then(() => {
      alert('ลบเมนูสำเร็จ')
    }).catch((error: any) => {
      alert('เกิดข้อผิดพลาดในการลบเมนู:')
    })
  }

  calcCOG(menus: any[], typeAVG: string) {
    let sumCost: number = 0
    let sumPriceInShop: number = 0
    menus.forEach((m: any) => {
      m.totalCost = +m.totalCost
      sumCost += m.totalCost ?? 0

      m.priceInShop = +m.priceInShop
      sumPriceInShop += m.priceInShop ?? 0
    });

    if (typeAVG === 'COG') {
      return sumPriceInShop
    } else {

      return sumCost
    }
  }

}
