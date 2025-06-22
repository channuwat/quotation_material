import { Component } from '@angular/core';
import { FirevabseService } from '../services/firevabse.service';
import { getDatabase, onValue, ref, remove, update } from 'firebase/database';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(fb: FirevabseService) {
    // let data = {
    //   name: 'หมูบด',
    //   unit: 'กก.',
    //   type: 'purchase',
    //   stockQty: 8,
    //   minQty: 15
    // }
    // fb.writeData('materials', data)
    //   .then(() => console.log('Data written successfully'))
    //   .catch((error) => console.error('Error writing data:', error));

    // fb.listenData('materials', (data) => {
    //   console.log('Data received:', data);
    // });
  }

  cartItems: any[] = [];

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const db = getDatabase();
    const cartRef = ref(db, 'cart');

    onValue(cartRef, snapshot => {
      const data = snapshot.val();
      this.cartItems = [];

      if (data) {
        for (const key in data) {
          this.cartItems.push({
            id: key,
            ...data[key]
          });
        }
      }
    });
  }

  async updateQty(item: any, delta: number) {
    const db = getDatabase();
    const itemRef = ref(db, `cart/${item.id}`);
    const newQty = item.qty + delta;

    if (newQty > 0) {
      await update(itemRef, { qty: newQty });
    } else {
      // ลบสินค้าถ้าจำนวนเหลือ 0
      await remove(itemRef);
    }
  }

  async exportToImage() {
    const element = document.getElementById('invoice');
    if (!element) return;

    const canvas = await html2canvas(element);
    const image = canvas.toDataURL('image/png');

    // ดาวน์โหลด
    const link = document.createElement('a');
    link.href = image;
    link.download = 'ใบสั่งซื้อ.png';
    link.click();
  }

}
