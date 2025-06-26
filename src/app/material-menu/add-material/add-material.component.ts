import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IonButton, IonHeader, IonItem, IonInput } from "@ionic/angular/standalone";
import { getApps, initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set } from 'firebase/database';
import { timestamp } from 'rxjs';
import { FirevabseService } from 'src/app/services/firevabse.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
  standalone: false
})
export class AddMaterialComponent implements OnInit {
  public sampleMaterials = [
    { name: "น้ำปลา", unit: "ขวด", unitSub: "มล.", price: 25, qty: 10, yieldPercent: 80, status: "full", storage: "ชั้นบน", createdAt: 1721412688000 },
  { name: "ซีอิ๊วดำ", unit: "ขวด", unitSub: "มล.", price: 20, qty: 8, yieldPercent: 90, status: "low", storage: "ชั้นล่าง", createdAt: 1721412698000 },
  { name: "น้ำตาลทราย", unit: "กก.", unitSub: "กรัม", price: 30, qty: 5, yieldPercent: 100, status: "full", storage: "ห้องแห้ง", createdAt: 1721412708000 },
  { name: "เกลือ", unit: "กก.", unitSub: "กรัม", price: 15, qty: 3, yieldPercent: 100, status: "full", storage: "ห้องแห้ง", createdAt: 1721412718000 },
  { name: "พริกป่น", unit: "กก.", unitSub: "กรัม", price: 80, qty: 2, yieldPercent: 95, status: "low", storage: "ห้องแห้ง", createdAt: 1721412728000 },
  { name: "น้ำส้มสายชู", unit: "ขวด", unitSub: "มล.", price: 18, qty: 4, yieldPercent: 98, status: "full", storage: "ชั้นบน", createdAt: 1721412738000 },
  { name: "ต้นหอม", unit: "กำ", unitSub: "กรัม", price: 12, qty: 7, yieldPercent: 70, status: "full", storage: "ตู้เย็น", createdAt: 1721412748000 },
  { name: "ผักชี", unit: "กำ", unitSub: "กรัม", price: 14, qty: 5, yieldPercent: 65, status: "low", storage: "ตู้เย็น", createdAt: 1721412758000 },
  { name: "กระเทียม", unit: "กก.", unitSub: "กรัม", price: 40, qty: 6, yieldPercent: 85, status: "full", storage: "ห้องแห้ง", createdAt: 1721412768000 },
  { name: "หอมแดง", unit: "กก.", unitSub: "กรัม", price: 45, qty: 4, yieldPercent: 80, status: "low", storage: "ห้องแห้ง", createdAt: 1721412778000 },
  { name: "ขิง", unit: "กก.", unitSub: "กรัม", price: 38, qty: 3, yieldPercent: 75, status: "empty", storage: "ตู้เย็น", createdAt: 1721412788000 },
  { name: "ใบมะกรูด", unit: "แพ็ค", unitSub: "ใบ", price: 10, qty: 2, yieldPercent: 60, status: "empty", storage: "ตู้เย็น", createdAt: 1721412798000 },
  { name: "ตะไคร้", unit: "กก.", unitSub: "กรัม", price: 22, qty: 3, yieldPercent: 70, status: "low", storage: "ตู้เย็น", createdAt: 1721412808000 },
  { name: "ข่า", unit: "กก.", unitSub: "กรัม", price: 28, qty: 2, yieldPercent: 65, status: "low", storage: "ตู้เย็น", createdAt: 1721412818000 },
  { name: "กะทิกล่อง", unit: "กล่อง", unitSub: "มล.", price: 25, qty: 6, yieldPercent: 100, status: "full", storage: "ชั้นล่าง", createdAt: 1721412828000 },
  { name: "น้ำมันพืช", unit: "ขวด", unitSub: "มล.", price: 45, qty: 8, yieldPercent: 100, status: "full", storage: "ชั้นล่าง", createdAt: 1721412838000 },
  { name: "หมูบด", unit: "กก.", unitSub: "กรัม", price: 120, qty: 5, yieldPercent: 85, status: "full", storage: "ช่องแข็ง", createdAt: 1721412848000 },
  { name: "ไก่สับ", unit: "กก.", unitSub: "กรัม", price: 110, qty: 4, yieldPercent: 80, status: "low", storage: "ช่องแข็ง", createdAt: 1721412858000 },
  { name: "ไข่ไก่", unit: "แผง", unitSub: "ฟอง", price: 90, qty: 3, yieldPercent: 100, status: "full", storage: "ชั้นบน", createdAt: 1721412868000 },
  { name: "แครอท", unit: "กก.", unitSub: "กรัม", price: 35, qty: 4, yieldPercent: 75, status: "full", storage: "ตู้เย็น", createdAt: 1721412878000 },
  ];

  materialForm: FormGroup;

  constructor(private navCtrl: NavController, public fb: FirevabseService, private formB: FormBuilder) {
    this.materialForm = this.formB.group({
      name: ['', Validators.required],
      unit: ['', Validators.required],
      unitSub: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      qty: [null, [Validators.required, Validators.min(0)]],
      status: ['full', Validators.required],
      storage: ['หน้าร้าน', Validators.required],
      yieldPercent: [100,[Validators.required, Validators.min(0), Validators.max(100)]],
      timestamp: [new Date().toISOString()]
    });
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

  material: any = {
    name: null,
    unit: null,
    unitSub: null,
    price: null,
    qty: null,
    yieldPercent: 100,
    status: 'full',
    storage: null
  };

  async addMaterial() {
    if (this.materialForm.invalid) {
      this.materialForm.markAllAsTouched();
      return;
    }

    try {
      await this.fb.pushData('materials', this.materialForm.value);
      alert('✅ เพิ่มวัตถุดิบเรียบร้อยแล้ว');
      this.navCtrl.back(); // กลับหน้าเดิม
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาด:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มวัตถุดิบ');
    }
  }

}
