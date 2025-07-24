import { Component, OnInit } from '@angular/core';
import Fuse from 'fuse.js';
import { FirevabseService } from 'src/app/services/firevabse.service';

@Component({
  selector: 'app-materials-management',
  templateUrl: './materials-management.page.html',
  styleUrls: ['./materials-management.page.scss'],
  standalone: false
})
export class MaterialsManagementPage implements OnInit {

  constructor(private fb: FirevabseService) { }
  materials: any[] = [];       // ข้อมูลทั้งหมด
  filteredMaterials: any[] = []; // ผลลัพธ์จากการค้นหา
  fuse!: Fuse<any>;           // ตัวค้นหา
  searchQuery: string = '';

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.materials = [];
    this.loadMaterials();
  }

  ionViewDidEnter() {
    try {
      this.fb.saveMaterialsToLocal((data: any) => {
        alert('✅ อัปเดตวัตถุดิบเรียบร้อย');
      })
    } catch (error) {
      console.error('อัปเดตล้มเหลว', error);
    }
  }

  loadMaterials() {
    this.fb.listenData('materials', (data: any[]) => {
      for (const key in data) {
        this.materials.push({ id: key, ...data[key] });
      }

      // ✅ สร้างตัวค้นหา fuse.js
      this.fuse = new Fuse(this.materials, {
        keys: ['name', 'storage'], // ฟิลด์ที่ให้ค้นหา
        threshold: 0.3, // ค่าความคลาดเคลื่อน (0 = ตรงเป๊ะ, 1 = ใกล้เคียง)
      });

      this.filteredMaterials = this.materials; // เริ่มต้นให้แสดงทั้งหมด
    })
  }

  onSearchChange(event: any) {
    const value = event.detail.value;

    if (!value || value.trim() === '') {
      this.filteredMaterials = this.materials; // แสดงทั้งหมด
    } else {
      this.filteredMaterials = this.fuse.search(value).map(result => result.item);
    }
  }
}
