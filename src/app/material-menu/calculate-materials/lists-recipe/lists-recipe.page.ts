import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirevabseService } from 'src/app/services/firevabse.service';

@Component({
  selector: 'app-lists-recipe',
  templateUrl: './lists-recipe.page.html',
  styleUrls: ['./lists-recipe.page.scss'],
  standalone: false
})
export class ListsRecipePage implements OnInit {

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
      mode:'ios',
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

}
