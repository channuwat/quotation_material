import { Component } from '@angular/core';
import { get, getDatabase, onValue, push, ref, set, update } from 'firebase/database';
import { FirevabseService } from '../services/firevabse.service';
import { ToastController } from '@ionic/angular';

interface Material {
  id: string;
  name: string;
  unit: string;
  unitSub: string;
  unitSubQty?: number;
  category: string;
  storageLocation: string;
  stockQty: number;
  minQty: number;
  status: 'empty' | 'low' | 'full';
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(public fb: FirevabseService, private toastCtrl: ToastController) {

  }


  searchText: string = '';
  groupBy: 'type' | 'category' | 'status' | 'storageLocation' = 'category';
  allMaterials: any[] = [];
  groupedMaterials: { [key: string]: any[] } = {};

  ngOnInit() {
    const db = getDatabase();
    const materialsRef = ref(db, 'materials');

    onValue(materialsRef, (snapshot) => {
      const data = snapshot.val();
      const materials: any[] = [];

      if (data) {
        for (const key in data) {
          materials.push({ id: key, ...data[key] });
        }
      }

      this.allMaterials = materials;
      this.groupMaterials();
    });
  }

  StatusTitle(key_title: string) {
    const objTitleCheck: any = ['low', 'full', 'empty', 'reorder', 'purchase'];
    const objTitle: any = ['เหลือน้อย ⚠️', 'เต็ม ✅', 'หมด ❌', 'เติมสต๊อก 📥', 'สั่งซื้อ 🛒'];
    const index = objTitleCheck.indexOf(key_title);
    let title = objTitle[index];
    return title !== undefined ? title : key_title
  }

  // ฟังก์ชันกรอง + จัดกลุ่ม + เรียงสถานะ
  filterMaterials() {
    // 1) กรองด้วย searchText
    const text = this.searchText.trim().toLowerCase();
    let list = this.allMaterials;
    if (text) {
      list = list.filter(m =>
        m.name.toLowerCase().includes(text) ||
        m.category.toLowerCase().includes(text) ||
        m.storageLocation.toLowerCase().includes(text)
      );
    }
  }

  groupMaterials() {
    const grouped: { [key: string]: any[] } = {};

    for (const item of this.allMaterials) {

      const key = item[this.groupBy] || 'ไม่ระบุ';
      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(item);
    }

    this.groupedMaterials = grouped;
  }

  updateStatus(material: any) {
    const db = getDatabase();
    const itemRef = ref(db, `materials/${material.id}`);

    update(itemRef, {
      status: material.status,
      lastUpdated: new Date().toISOString()
    }).then(() => {
      console.log(`📦 อัปเดตสถานะของ ${material.name} → ${material.status}`);
    }).catch((err) => {
      console.error('❌ Error updating status:', err);
    });
  }

  updateItem(material: Material) {
    if (material.unitSubQty == null) return;
    const db = getDatabase();
    const itemRef = ref(db, `materials/${material.id}`);
    update(itemRef, { unitSubQty: material.unitSubQty, lastUpdated: new Date().toISOString() })
      .then(() => console.log(`อัปเดท ${material.name} unitSubQty → ${material.unitSubQty}`));
  }

   async addToCart(material: any) {
    const db = getDatabase(); // สร้างอ้างอิงไปยัง Realtime DB
    const cartRef = ref(db, `cart/${material.id}`); // ใช้ id เป็น key

    try {
      const snapshot = await get(cartRef);

      if (!snapshot.exists()) {
        // ถ้าไม่มี → เพิ่มเข้า cart
        await set(cartRef, {
          name: material.name,
          unitSub: material.unitSub,
          qty: 1,
          addedAt: Date.now()
        });

        this.presentToast('✅ เพิ่มลงตะกร้าแล้ว');
      } else {
        this.presentToast('⚠️ รายการนี้มีในตะกร้าแล้ว');
      }
    } catch (error) {
      console.error('❌ Error accessing cart:', error);
      this.presentToast('เกิดข้อผิดพลาดในการเข้าถึงตะกร้า');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'primary',
      position: 'bottom'
    });
    toast.present();
  }
}
