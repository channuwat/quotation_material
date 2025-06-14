import { Component } from '@angular/core';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { FirevabseService } from '../services/firevabse.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(public fb:FirevabseService) {

  }

  materials: any[] = [];

  ngOnInit() {
    const db = getDatabase();
    const materialsRef = ref(db, 'materials');

    // ดึงข้อมูลแบบ realtime
    onValue(materialsRef, (snapshot) => {
      const data = snapshot.val();
      this.materials = [];

      if (data) {
        for (const key in data) {
          this.materials.push({ id: key, ...data[key] });
        }
      }
    });
  }

  //   material = {
  //   name: '',
  //   unit: '',
  //   type: '',
  //   stockQty: 0,
  //   minQty: 0,
  // };

  // async addMaterial() {
  //   const db = getDatabase();
  //   const materialsRef = ref(db, 'materials');
  //   const newRef = push(materialsRef); // สร้าง key สุ่มไม่ซ้ำ
    
  //   const data = {
  //     ...this.material,
  //     needToReorder: this.material.stockQty < this.material.minQty,
  //     lastUpdated: new Date().toISOString(),
  //   };
  //   // await set(newRef, data);
  //   await this.fb.pushData('materials',this.material)
  //   alert('✅ บันทึกเรียบร้อยแล้ว');
  //   this.material = { name: '', unit: '', type: '', stockQty: 0, minQty: 0 };
  // }
}
