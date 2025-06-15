import { Component, OnInit } from '@angular/core';
import { IonButton, IonHeader, IonItem, IonInput } from "@ionic/angular/standalone";
import { getDatabase, push, ref, set } from 'firebase/database';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss'],
  standalone: false
})
export class AddMaterialComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  material = {
    name: '',
    unit: '',
    type: '',
    category: '',
    storageLocation: ''
  };

  async addMaterial() {
    const db = getDatabase();
    const materialsRef = ref(db, 'materials');
    const newRef = push(materialsRef);

    await set(newRef, {
      ...this.material,
      lastUpdated: new Date().toISOString()
    });

    alert('✅ เพิ่มวัตถุดิบเรียบร้อยแล้ว');
    this.material = { name: '', unit: '', type: '', category: '', storageLocation: '' };
  }

}
