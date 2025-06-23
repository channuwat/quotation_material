import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { get, getDatabase, ref, remove, update } from 'firebase/database';
import { FirevabseService } from 'src/app/services/firevabse.service';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.page.html',
  styleUrls: ['./edit-material.page.scss'],
  standalone: false
})
export class EditMaterialPage implements OnInit {

  materialForm: FormGroup;
  public materialId: string = '';

  constructor(
    private db: FirevabseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.materialForm = this.fb.group({
      name: ['', Validators.required],
      unit: ['', Validators.required],
      unitSub: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      qty: [null, [Validators.required, Validators.min(0)]],
      status: ['full', Validators.required],
      storageLocation: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.materialId = this.route.snapshot.paramMap.get('id')!;
  }
  
  ionViewWillEnter(){
    setTimeout(() => {
      this.loadMaterial();
    }, 500);
  }

  async loadMaterial() {
    this.db.listenData('materials/' + this.materialId, (data: any[]) => {
      try {
        if (data) {
          this.materialForm.patchValue(data);
        } else {
          console.log('ไม่พบข้อมูลวัตถุดิบ');
          this.navCtrl.navigateBack('/tabs/material-menu/materials-management');;
        }
      } catch (error) {
        console.error('โหลดข้อมูลผิดพลาด', error);
      }
    })
  }

  async updateMaterial() {
    if (this.materialForm.invalid) {
      this.materialForm.markAllAsTouched();
      return;
    }

    const db = getDatabase();
    const matRef = ref(db, `materials/${this.materialId}`);

    try {
      await update(matRef, this.materialForm.value);
      alert('✅ อัปเดตวัตถุดิบเรียบร้อย');
      this.navCtrl.back();
    } catch (error) {
      console.error('อัปเดตล้มเหลว', error);
    }
  }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'ลบวัตถุดิบ?',
      message: 'คุณแน่ใจหรือไม่ว่าต้องการลบวัตถุดิบนี้?',
      buttons: [
        { text: 'ยกเลิก', role: 'cancel' },
        {
          text: 'ลบ',
          role: 'destructive',
          handler: () => this.deleteMaterial()
        }
      ]
    });

    await alert.present();
  }

  async deleteMaterial() {
    try {
      this.db.deleteData('materials/' + this.materialId)
    } catch (error) {
      alert('❌ เกิดข้อผิดพลาดในการลบวัตถุดิบ');
    }

    // const db = getDatabase();
    // const matRef = ref(db, `materials/${this.materialId}`);

    // try {
    //   await remove(matRef);
    //   alert('🗑️ ลบวัตถุดิบแล้ว');
    //   this.navCtrl.back();
    // } catch (error) {
    //   console.error('ลบล้มเหลว', error);
    // }
  }

}
