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
  {
    "name": "ผักชี",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 75.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "คื่นนฉ่าย",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 65.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ต้นหอม",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 55.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "หัวหอม",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 30.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ข้าวโพดแช่แข็ง",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 69.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ขิง",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 45.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "กระเทียม",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 120.0,
    "qty": 1000.0,
    "yieldPercent": 95.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "พริก",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 55.0,
    "qty": 1000.0,
    "yieldPercent": 90.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ขิง",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 50.0,
    "qty": 1000.0,
    "yieldPercent": 98.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ขนมปังญวน",
    "unit": "ก.้อน",
    "unitSub": "null",
    "price": 3.2,
    "qty": 1.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ข้าวสาร",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 164.0,
    "qty": 1000.0,
    "yieldPercent": 195.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ขนมปังแซนวิช",
    "unit": "แผ่น",
    "unitSub": "null",
    "price": 2.2,
    "qty": 10.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "กล่อง 725ml",
    "unit": "ก.ล่อง",
    "unitSub": "null",
    "price": 95.0,
    "qty": 50.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ถุง 8x16",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 42.0,
    "qty": 500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ถุุง 9x18",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 42.0,
    "qty": 500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ช้อนพลาสติก",
    "unit": "คัน",
    "unitSub": "null",
    "price": 18.0,
    "qty": 50.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ซองเทปกาว",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 135.0,
    "qty": 500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "แก้ว",
    "unit": "ใบ",
    "unitSub": "null",
    "price": 42.0,
    "qty": 50.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ฝาแก้ว",
    "unit": "ใบ",
    "unitSub": "null",
    "price": 25.0,
    "qty": 50.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ถ้วยแดง",
    "unit": "ใบ",
    "unitSub": "null",
    "price": 85.0,
    "qty": 25.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "หมูบด 80/20",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 145.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "หมูบด 50/50",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 135.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "เล้ง",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 69.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ไข่",
    "unit": "ฟอง",
    "unitSub": "null",
    "price": 3.3,
    "qty": 1.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "เต้าหู้ไข่",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 10.0,
    "qty": 105.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "แฮม",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 185.0,
    "qty": 500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ไส้กรอก",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 103.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ปูอัด(10ก./ชิ้น)",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 79.0,
    "qty": 500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "หมูยอ",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 40.0,
    "qty": 260.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "กุนเชียง",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 300.0,
    "qty": 1000.0,
    "yieldPercent": 85.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ไส้เบอร์เกอร์",
    "unit": "ชิ้น",
    "unitSub": "null",
    "price": 215.0,
    "qty": 40.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ปลา",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 119.0,
    "qty": 1000.0,
    "yieldPercent": 70.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำซุป",
    "unit": "มล.",
    "unitSub": "null",
    "price": 98.63,
    "qty": 7630.0,
    "yieldPercent": 95.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "หมูผัด",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 176.89,
    "qty": 1000.0,
    "yieldPercent": 95.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ชีส",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 339.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำมันพืช",
    "unit": "มล.",
    "unitSub": "null",
    "price": 63.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "เนย",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 135.0,
    "qty": 250.0,
    "yieldPercent": 98.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "พริกไทย",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 195.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "พริกป่น",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 90.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำส้มสายชู",
    "unit": "มล.",
    "unitSub": "null",
    "price": 12.0,
    "qty": 250.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ซอสหอย",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 38.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "รสดี",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 27.0,
    "qty": 150.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำตาล",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 29.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ผงชูรส",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 58.0,
    "qty": 500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำปลา(ใหญ่)",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 29.0,
    "qty": 700.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำปลา(เล็ก)",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 17.0,
    "qty": 300.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ซีอิ้วขาว",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 51.0,
    "qty": 700.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ซอสแม็คกี้(ใหญ่)",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 53.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ซอสแม็คกี้(เล็ก)",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 36.0,
    "qty": 680.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "พริกเผา",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 116.0,
    "qty": 900.0,
    "yieldPercent": 98.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ซอส BBQ",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 115.0,
    "qty": 500.0,
    "yieldPercent": 98.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ซอสพริกซอง",
    "unit": "ซอง",
    "unitSub": "null",
    "price": 88.0,
    "qty": 100.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ซอสมะเขือซอง",
    "unit": "ซอง",
    "unitSub": "null",
    "price": 88.0,
    "qty": 100.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ซอสครอบจักรวาล",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 133.0,
    "qty": 1400.0,
    "yieldPercent": 97.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "เนยกระเทียม",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 239.0,
    "qty": 500.0,
    "yieldPercent": 99.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "พริกน้ำปลา",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 76.6,
    "qty": 1500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "กระเทียมเจียว",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 47.4,
    "qty": 500.0,
    "yieldPercent": 99.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "พริกป่น",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 105.0,
    "qty": 500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "เครื่องพะโล้",
    "unit": "ซอง",
    "unitSub": "null",
    "price": 10.0,
    "qty": 1.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำถัง",
    "unit": "มล.",
    "unitSub": "null",
    "price": 15.0,
    "qty": 18900.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำขวด",
    "unit": "ขวด",
    "unitSub": "null",
    "price": 2.7,
    "qty": 1.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ผงโกโก้",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 255.0,
    "qty": 4000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ผงชาไทย",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 90.0,
    "qty": 400.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ผงชาเขียว",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 70.0,
    "qty": 200.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ผงกาแฟโบราณ",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 65.0,
    "qty": 100.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ผงกาแฟสด",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 135.0,
    "qty": 250.0,
    "yieldPercent": 98.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ผงโอวันติน",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 85.0,
    "qty": 450.0,
    "yieldPercent": 98.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "นมข้นจืด",
    "unit": "มล.",
    "unitSub": "null",
    "price": 26.0,
    "qty": 405.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "นมข้นหวาน",
    "unit": "มล.",
    "unitSub": "null",
    "price": 26.0,
    "qty": 505.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "นมจืด",
    "unit": "มล.",
    "unitSub": "null",
    "price": 48.75,
    "qty": 830.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำส้ม",
    "unit": "มล.",
    "unitSub": "null",
    "price": 6.0,
    "qty": 300.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำแข็ง",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 40.0,
    "qty": 22500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำมะนาว",
    "unit": "มล.",
    "unitSub": "null",
    "price": 125.0,
    "qty": 1000.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "น้ำมันงา",
    "unit": "มล.",
    "unitSub": "null",
    "price": 42.0,
    "qty": 100.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "พริกเผาผสม",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 91.2,
    "qty": 940.0,
    "yieldPercent": 98.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "เส้นก๋วยจั๊บ",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 20.0,
    "qty": 500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "หมูหมัก",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 153.7,
    "qty": 1000.0,
    "yieldPercent": 98.0,
    "status": "full",
    "storage": "null"
  },
  {
    "name": "ถุง 7x11",
    "unit": "Kg.",
    "unitSub": "g.",
    "price": 40.0,
    "qty": 500.0,
    "yieldPercent": 100.0,
    "status": "full",
    "storage": "null"
  }
]

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
    if (!getApps().length) {
      initializeApp(environment.firebase);
    }

    const db = getDatabase();
    const materialsRef = ref(db, 'materials');

    for (const item of this.sampleMaterials) {
      const completeItem = {
        ...item,
        // needToReorder: item.stockQty < item.minQty,
        lastUpdated: new Date().toISOString()
      };

      const newRef = push(materialsRef);
      await set(newRef, completeItem);
    }

    console.log('✅ อัปโหลดตัวอย่างเสร็จแล้ว');
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
