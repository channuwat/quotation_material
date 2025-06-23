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
    { name: "น้ำปลา", unit: "ขวด", unitSub: "มล.", price: 25, qty: 10, status: "full", storage: "ชั้นบน", createdAt: 1721412688000 },
    { name: "ซีอิ๊ว", unit: "ขวด", unitSub: "มล.", price: 20, qty: 5, status: "low", storage: "ชั้นบน", createdAt: 1721412689000 },
    { name: "ซอสหอย", unit: "ขวด", unitSub: "มล.", price: 30, qty: 0, status: "empty", storage: "ตู้เย็น", createdAt: 1721412690000 },
    { name: "น้ำตาล", unit: "กิโลกรัม", unitSub: "กรัม", price: 18, qty: 8, status: "full", storage: "ห้องแห้ง", createdAt: 1721412691000 },
    { name: "เกลือ", unit: "กิโลกรัม", unitSub: "กรัม", price: 10, qty: 1, status: "low", storage: "ห้องแห้ง", createdAt: 1721412692000 },
    { name: "พริกป่น", unit: "ถุง", unitSub: "กรัม", price: 15, qty: 0, status: "empty", storage: "ตู้ลิ้นชัก", createdAt: 1721412693000 },
    { name: "น้ำมันพืช", unit: "ลิตร", unitSub: "มล.", price: 35, qty: 4, status: "full", storage: "ชั้นล่าง", createdAt: 1721412694000 },
    { name: "กระเทียม", unit: "กิโลกรัม", unitSub: "กรัม", price: 40, qty: 3, status: "low", storage: "ห้องแห้ง", createdAt: 1721412695000 },
    { name: "หอมแดง", unit: "กิโลกรัม", unitSub: "กรัม", price: 35, qty: 0, status: "empty", storage: "ห้องแห้ง", createdAt: 1721412696000 },
    { name: "ไข่ไก่", unit: "แผง", unitSub: "ฟอง", price: 90, qty: 2, status: "low", storage: "ตู้เย็น", createdAt: 1721412697000 },
    { name: "ขิง", unit: "กิโลกรัม", unitSub: "กรัม", price: 50, qty: 6, status: "full", storage: "ตู้เย็น", createdAt: 1721412698000 },
    { name: "ตะไคร้", unit: "กิโลกรัม", unitSub: "กรัม", price: 25, qty: 1, status: "low", storage: "ตู้เย็น", createdAt: 1721412699000 },
    { name: "ใบมะกรูด", unit: "กรัม", unitSub: "กรัม", price: 5, qty: 0, status: "empty", storage: "ตู้เย็น", createdAt: 1721412700000 },
    { name: "มะนาว", unit: "กิโลกรัม", unitSub: "ลูก", price: 60, qty: 5, status: "full", storage: "ตู้เย็น", createdAt: 1721412701000 },
    { name: "น้ำมะขาม", unit: "ถุง", unitSub: "มล.", price: 22, qty: 3, status: "low", storage: "ชั้นบน", createdAt: 1721412702000 },
    { name: "พริกไทย", unit: "ถุง", unitSub: "กรัม", price: 28, qty: 0, status: "empty", storage: "ตู้ลิ้นชัก", createdAt: 1721412703000 },
    { name: "ซอสพริก", unit: "ขวด", unitSub: "มล.", price: 27, qty: 7, status: "full", storage: "ชั้นบน", createdAt: 1721412704000 },
    { name: "ซอสมะเขือเทศ", unit: "ขวด", unitSub: "มล.", price: 27, qty: 2, status: "low", storage: "ชั้นบน", createdAt: 1721412705000 },
    { name: "แครอท", unit: "กิโลกรัม", unitSub: "กรัม", price: 33, qty: 0, status: "empty", storage: "ตู้เย็น", createdAt: 1721412706000 },
    { name: "เนื้อหมู", unit: "กิโลกรัม", unitSub: "กรัม", price: 150, qty: 5, status: "full", storage: "แช่แข็ง", createdAt: 1721412707000 }
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
      storageLocation: ['หน้าร้าน', Validators.required],
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
    status: 'full',
    storageLocation: null
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
