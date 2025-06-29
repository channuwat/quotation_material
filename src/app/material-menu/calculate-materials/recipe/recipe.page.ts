import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { getDatabase, onValue, ref } from 'firebase/database';
import { FirevabseService } from 'src/app/services/firevabse.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
  standalone: false
})
export class RecipePage implements OnInit {
  recipeForm = new FormGroup({
    menuName: new FormControl(''),
    ingredients: new FormArray([]),
    salePrice: new FormControl(0),
    deliveryPrice: new FormControl(0),
    gasPercent: new FormControl(5),
  });

  materialsList: any[] = [];
  totalCost: number = 0;
  priceRecommend: number = 0;
  priceDeliveryRecommend: number = 0;
  productionCost: number = 0;
  profitSale = 0;
  profitDelivery = 0;
  COG = 0;
  COGD = 0;

  constructor(private db: FirevabseService) {

  }

  ngOnInit() {
    this.fetchMaterials();
    this.addIngredient(); // เพิ่ม 1 แถวเริ่มต้น
  }

  fetchMaterials() {
    // const db = getDatabase();
    // const materialsRef = ref(db, 'materials');
    this.db.listenData('materials', (data: any) => {
      if (data) {

        this.materialsList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        this.materialsList.forEach((material: any) => {
          let pricePerYield = this.calculateYieldPrice(material.price, material.yieldPercent);
          material.pricePerYield = pricePerYield;
        });
      }
    })
  }

  calculateYieldPrice(pricePerUnit: number, yieldPercent: number): number {
    if (yieldPercent <= 0 || yieldPercent > 100) return 0; // ป้องกันหาร 0 หรือเกินจริง
    return +(pricePerUnit / (yieldPercent / 100)).toFixed(2);
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(
      new FormGroup({
        materialId: new FormControl(''),
        name: new FormControl(''),
        pricePerUnit: new FormControl(0),
        unit: new FormControl(''),
        qty: new FormControl(0),
        qtyUse: new FormControl(0),
        pricePerYield: new FormControl(0),
      })
    );
  }

  onMaterialChange(i: number, materialId: string) {
    const mat = this.materialsList.find((m) => m.id === materialId);
    if (mat) {
      const row = this.ingredients.at(i) as FormGroup;
      row.patchValue({
        name: mat.name,
        unit: mat.unit,
        pricePerUnit: mat.price,
        qty: mat.qty,
        pricePerYield: mat.pricePerYield,
      });
    }
  }

  calculateCost() {
    const form: any = this.recipeForm.value;
    const matCost = form.ingredients.reduce((sum: number, ing: any) => {
      let pricePerYield = ing.pricePerYield / ing.qty
      return sum + ing.qtyUse * pricePerYield;
    }, 0);

    const gas = (matCost * (form.gasPercent / 100)) + matCost; // คำนวณต้นทุนรวมของวัตถุดิบและแก๊ส

    this.productionCost = gas;
    this.priceRecommend = gas * 2.5; // แนะนำราคาขาย 2.5 เท่าของต้นทุน(cog 40%))
    this.priceDeliveryRecommend = this.priceRecommend * 1.6; // แนะนำราคาขายส่งเดลิเวอร์ลี่ 1.6 เท่าของราคาขาย
    this.profitSale = form.salePrice - this.productionCost; // กำไรจากการขาย
    this.profitDelivery = form.deliveryPrice - this.productionCost; // กำไรจากการขายส่งเดลิเวอร์ลี่
    this.COG = this.productionCost / form.salePrice > 0 || 0 ? this.productionCost / form.salePrice : 0; // ต้นทุนขาย (COG) = ต้นทุนการผลิต / ราคาขาย
  }
}
