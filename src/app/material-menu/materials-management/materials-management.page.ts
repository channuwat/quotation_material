import { Component, OnInit } from '@angular/core';
import { FirevabseService } from 'src/app/services/firevabse.service';

@Component({
  selector: 'app-materials-management',
  templateUrl: './materials-management.page.html',
  styleUrls: ['./materials-management.page.scss'],
  standalone: false
})
export class MaterialsManagementPage implements OnInit {

  constructor(private fb: FirevabseService) { }

  materials: any[] = [];

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.materials = [];
    this.loadMaterials();
  }

  loadMaterials() {
    this.fb.listenData('materials', (data: any[]) => {
      for (const key in data) {
        this.materials.push({ id: key, ...data[key] });
      }
    })
  }

  

}
