import { Component } from '@angular/core';
import { getDatabase, onValue, push, ref, set, update } from 'firebase/database';
import { FirevabseService } from '../services/firevabse.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(public fb: FirevabseService) {

  }

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

  groupMaterials() {
    const grouped: { [key: string]: any[] } = {};

    for (const item of this.allMaterials) {
      switch (item[this.groupBy]) {
        case "purchase":
          item[this.groupBy] = "สั่งซื้อ 🛒";
          break;
        case "reorder":
          item[this.groupBy] = "เติมสต็อก 📥";
          break;
        case "empty":
          item[this.groupBy] = "ไม่มีสต็อก ❌";
          break;
        case "low":
          item[this.groupBy] = "เหลือน้อย ⚠️";
          break;
        case "full":
          item[this.groupBy] = "เต็ม ✅";
          break;
        default: item[this.groupBy] ?? 'ไม่ระบุ';
          break;
      }

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
}
