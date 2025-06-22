import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { FirevabseService } from 'src/app/services/firevabse.service';

@Component({
  selector: 'app-stock-status',
  templateUrl: './stock-status.page.html',
  styleUrls: ['./stock-status.page.scss'],
  standalone: false
})
export class StockStatusPage implements OnInit {

  constructor(public fb: FirevabseService) { }

  materials: any[] = [];

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
    this.fb.listenData('materials', (data) => {
      this.materials = [];

      if (data) {
        for (const key in data) {
          this.materials.push({
            id: key,
            ...data[key]
          });
        }

        const statusOrder = ['empty', 'low', 'full'];
        this.materials.sort((a, b) => {
          return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        });
      }
    });
  }

  updateStatus(material: any) {
    this.fb.updateData('materials/' + material.id,
      { status: material.status })
      .then(() => {
        console.log('Status updated successfully');
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
    // const db = getDatabase();
    // const matRef = ref(db, `materials/${material.id}`);

    // update(matRef, {
    //   status: material.status
    // });
  }

}
