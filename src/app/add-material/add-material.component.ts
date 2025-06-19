import { Component, OnInit } from '@angular/core';
import { IonButton, IonHeader, IonItem, IonInput } from "@ionic/angular/standalone";
import { getApps, initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set } from 'firebase/database';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
  standalone: false
})
export class AddMaterialComponent implements OnInit {
  public sampleMaterials = [
    { name: 'หมูบด', unit: 'กก.', unitSub: 'ก.', weightQty: 1000, type: 'purchase', category: 'เนื้อสัตว์', price: 130, storageLocation: 'ตู้แช่' },
    { name: 'ไก่สับ', unit: 'กก.', unitSub: 'ก.', weightQty: 1000, type: 'reorder', category: 'เนื้อสัตว์', price: 90, storageLocation: 'ตู้แช่' },
    { name: 'เนื้อวัวสไลซ์', unit: 'กก.', unitSub: 'ก.', weightQty: 1000, type: 'purchase', category: 'เนื้อสัตว์', price: 250, storageLocation: 'ตู้แช่' },
    { name: 'ปลาหมึก', unit: 'กก.', unitSub: 'ก.', weightQty: 1000, type: 'reorder', category: 'เนื้อสัตว์', price: 220, storageLocation: 'ตู้แช่' },
    { name: 'ต้นหอม', unit: 'มัด', unitSub: 'มัด', weightQty: 200, type: 'purchase', category: 'ผัก', price: 15, storageLocation: 'ตู้แช่' },
    { name: 'ผักชี', unit: 'มัด', unitSub: 'มัด', weightQty: 150, type: 'reorder', category: 'ผัก', price: 20, storageLocation: 'ตู้แช่' },
    { name: 'พริกขี้หนู', unit: 'ขีด', unitSub: 'ขีด', weightQty: 100, type: 'purchase', category: 'ผัก', price: 12, storageLocation: 'ตู้แช่' },
    { name: 'ผักกาดขาว', unit: 'กก.', unitSub: 'ก.', weightQty: 1000, type: 'reorder', category: 'ผัก', price: 30, storageLocation: 'ตู้แช่' },
    { name: 'ใบโหระพา', unit: 'มัด', unitSub: 'มัด', weightQty: 100, type: 'purchase', category: 'ผัก', price: 10, storageLocation: 'ตู้แช่' },
    { name: 'น้ำปลา', unit: 'ขวด', unitSub: 'ขวด', weightQty: 700, type: 'purchase', category: 'เครื่องปรุง', price: 45, storageLocation: 'ถังหน้าร้าน' },
    { name: 'น้ำตาลทราย', unit: 'กก.', unitSub: 'ก.', weightQty: 1000, type: 'reorder', category: 'เครื่องปรุง', price: 25, storageLocation: 'ถังหน้าร้าน' },
    { name: 'ซอสปรุงรส', unit: 'ขวด', unitSub: 'ขวด', weightQty: 300, type: 'purchase', category: 'เครื่องปรุง', price: 35, storageLocation: 'ถังหน้าร้าน' },
    { name: 'ซอสมะเขือเทศ', unit: 'ขวด', unitSub: 'ขวด', weightQty: 500, type: 'reorder', category: 'เครื่องปรุง', price: 30, storageLocation: 'บาร์น้ำ' },
    { name: 'นมสด', unit: 'กล่อง', unitSub: 'ล.', weightQty: 1000, type: 'purchase', category: 'เครื่องดื่ม', price: 40, storageLocation: 'บาร์น้ำ' },
    { name: 'น้ำแข็งหลอด', unit: 'ถุง', unitSub: 'ถุง', weightQty: 2000, type: 'reorder', category: 'เครื่องดื่ม', price: 15, storageLocation: 'บาร์น้ำ' },
    { name: 'น้ำเปล่า', unit: 'แพ็ค', unitSub: 'แพ็ค', weightQty: 6000, type: 'purchase', category: 'เครื่องดื่ม', price: 20, storageLocation: 'ถังหน้าร้าน' },
    { name: 'ข้าวสารหอมมะลิ', unit: 'กก.', unitSub: 'ก.', weightQty: 1000, type: 'purchase', category: 'แป้งและข้าว', price: 50, storageLocation: 'ถังหน้าร้าน' },
    { name: 'ขนมปังฝรั่งเศส', unit: 'ก้อน', unitSub: 'ก้อน', weightQty: 500, type: 'reorder', category: 'แป้งและข้าว', price: 18, storageLocation: 'ตู้แช่' },
    { name: 'เส้นก๋วยจั๊บ', unit: 'ถุง', unitSub: 'ถุง', weightQty: 500, type: 'purchase', category: 'แป้งและข้าว', price: 25, storageLocation: 'ตู้แช่' },
    { name: 'แป้งทอดกรอบ', unit: 'กก.', unitSub: 'ก.', weightQty: 1000, type: 'reorder', category: 'แป้งและข้าว', price: 22, storageLocation: 'ถังหน้าร้าน' }
  ];

  constructor() {
  }


  async ngOnInit() {
    // if (!getApps().length) {
    //   initializeApp(environment.firebase);
    // }

    // const db = getDatabase();
    // const materialsRef = ref(db, 'materials');

    // for (const item of this.sampleMaterials) {
    //   const completeItem = {
    //     ...item,
    //     // needToReorder: item.stockQty < item.minQty,
    //     lastUpdated: new Date().toISOString()
    //   };

    //   const newRef = push(materialsRef);
    //   await set(newRef, completeItem);
    // }

    // console.log('✅ อัปโหลดตัวอย่างเสร็จแล้ว');
  }

  material = {
    name: '',
    unit: '',
    type: '',
    category: '',
    storageLocation: ''
  };

  async addMaterial() {

    // const db = getDatabase();
    // const materialsRef = ref(db, 'materials');
    // const newRef = push(materialsRef);

    // await set(newRef, {
    //   ...this.material,
    //   lastUpdated: new Date().toISOString()
    // });

    // alert('✅ เพิ่มวัตถุดิบเรียบร้อยแล้ว');
    // this.material = { name: '', unit: '', type: '', category: '', storageLocation: '' };
  }

}
