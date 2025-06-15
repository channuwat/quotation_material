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

  groupedMaterials: { [category: string]: any[] } = {};

  ngOnInit() {
    const db = getDatabase();
    const materialsRef = ref(db, 'materials');

    onValue(materialsRef, (snapshot) => {
      const data = snapshot.val();
      const grouped: { [category: string]: any[] } = {};

      if (data) {
        for (const key in data) {
          const item = { id: key, ...data[key] };
          const category = item.category || 'ไม่ระบุหมวดหมู่';
          if (!grouped[category]) {
            grouped[category] = [];
          }
          grouped[category].push(item);
        }
      }

      this.groupedMaterials = grouped;
    });
  }
}
