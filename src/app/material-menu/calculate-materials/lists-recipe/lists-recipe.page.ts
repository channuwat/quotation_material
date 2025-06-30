import { Component, OnInit } from '@angular/core';
import { FirevabseService } from 'src/app/services/firevabse.service';

@Component({
  selector: 'app-lists-recipe',
  templateUrl: './lists-recipe.page.html',
  styleUrls: ['./lists-recipe.page.scss'],
  standalone: false
})
export class ListsRecipePage implements OnInit {

  menus: any[] = [];
  menuEx: any = [
    {
      name: "ข้าวไข่เจียว",
      gasCostPercent: 3,
      priceInShop: 50,
      priceDelivery: 60,
      ingredients: [
        { materialId: "-Ngk987yzABCD", usageQty: 45.95 },
        { materialId: "-Ngk789ghiJKL", usageQty: 93.53 },
        { materialId: "-Ngk654stuVWX", usageQty: 6.47 }
      ],
      createdAt: 1751190361362
    },
    {
      name: "ข้าวหมูทอด",
      gasCostPercent: 7,
      priceInShop: 45,
      priceDelivery: 50,
      ingredients: [
        { materialId: "-Ngk654stuVWX", usageQty: 24.27 },
        { materialId: "-Ngk789ghiJKL", usageQty: 18.04 }
      ],
      createdAt: 1751190361362
    },
    {
      name: "ข้าวหมูกรอบ",
      gasCostPercent: 5,
      priceInShop: 35,
      priceDelivery: 55,
      ingredients: [
        { materialId: "-Ngk789ghiJKL", usageQty: 25.27 },
        { materialId: "-Ngk321mnoPQR", usageQty: 80.86 },
        { materialId: "-Ngk456defUVW", usageQty: 14.67 }
      ],
      createdAt: 1751190361362
    },
    {
      name: "ก๋วยจั๊บญวน",
      gasCostPercent: 5,
      priceInShop: 50,
      priceDelivery: 60,
      ingredients: [
        { materialId: "-Ngk321mnoPQR", usageQty: 78.47 },
        { materialId: "-Ngk987yzABCD", usageQty: 68.26 }
      ],
      createdAt: 1751190361362
    },
    {
      name: "ข้าวผัดหมู",
      gasCostPercent: 7,
      priceInShop: 40,
      priceDelivery: 50,
      ingredients: [
        { materialId: "-Ngk456defUVW", usageQty: 84.2 },
        { materialId: "-Ngk654stuVWX", usageQty: 63.18 },
        { materialId: "-Ngk789ghiJKL", usageQty: 11.62 }
      ],
      createdAt: 1751190361362
    },
    {
      name: "ข้าวมันไก่",
      gasCostPercent: 3,
      priceInShop: 35,
      priceDelivery: 60,
      ingredients: [
        { materialId: "-Ngk789ghiJKL", usageQty: 21.65 },
        { materialId: "-Ngk654stuVWX", usageQty: 61.91 },
        { materialId: "-Ngk123abcXYZ", usageQty: 18.62 },
        { materialId: "-Ngk456defUVW", usageQty: 71.05 }
      ],
      createdAt: 1751190361362
    },
    {
      name: "ข้าวต้มเล้ง",
      gasCostPercent: 7,
      priceInShop: 50,
      priceDelivery: 55,
      ingredients: [
        { materialId: "-Ngk321mnoPQR", usageQty: 15.9 },
        { materialId: "-Ngk789ghiJKL", usageQty: 47.99 }
      ],
      createdAt: 1751190361362
    },
    {
      name: "ข้าวกระเพราหมู",
      gasCostPercent: 7,
      priceInShop: 40,
      priceDelivery: 55,
      ingredients: [
        { materialId: "-Ngk456defUVW", usageQty: 47.75 },
        { materialId: "-Ngk123abcXYZ", usageQty: 66.5 }
      ],
      createdAt: 1751190361362
    },
    {
      name: "ข้าวหมูกระเทียม",
      gasCostPercent: 5,
      priceInShop: 40,
      priceDelivery: 55,
      ingredients: [
        { materialId: "-Ngk456defUVW", usageQty: 23.62 },
        { materialId: "-Ngk987yzABCD", usageQty: 90.47 },
        { materialId: "-Ngk321mnoPQR", usageQty: 45.46 },
        { materialId: "-Ngk789ghiJKL", usageQty: 24.77 }
      ],
      createdAt: 1751190361362
    },
    {
      name: "ขนมปังญวน",
      gasCostPercent: 5,
      priceInShop: 35,
      priceDelivery: 45,
      ingredients: [
        { materialId: "-Ngk654stuVWX", usageQty: 77.03 },
        { materialId: "-Ngk456defUVW", usageQty: 90.57 },
        { materialId: "-Ngk789ghiJKL", usageQty: 18.89 }
      ],
      createdAt: 1751190361362
    }
  ]
  constructor(private db: FirevabseService) { }

  ngOnInit() {
    this.loadMenus();
    // this.addMenu(this.menuEx);
  }

  loadMenus() {
    this.db.listenData('menus', (res) => {
      this.menus = [];
      for (const key in res) {
        this.menus.push({ id: key, ...res[key] });
      }
    })
  }

  addMenu(menus: any) {
    menus.forEach((menu: any) => {
      // เพิ่ม timestamp
      menu.createdAt = Date.now();
      this.db.pushData('menus', menu).then((error) => {
        console.log(error);
      })
    });
  }

}
