import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { getApps, initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';
import { FirevabseService } from 'src/app/services/firevabse.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
  standalone: false
})
export class EditRecipePage implements OnInit {
  menuId: string = '';
  recipeForm = new FormGroup({
    menuName: new FormControl('', Validators.required),
    ingredients: new FormArray([], Validators.required),
    salePrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    deliveryPrice: new FormControl(0,[Validators.required, Validators.min(0)]),
    gasPercent: new FormControl(5, [Validators.required, Validators.min(0)]),
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

  constructor(private db: FirevabseService, private route: ActivatedRoute, private nav: NavController) {
  }

  ngOnInit() {
    this.menuId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchMaterials();

  }

  fetchMaterials() {
    this.db.listenData('menus/' + this.menuId, (data: any) => {
      if (data) {
        this.recipeForm.patchValue({
          menuName: data.name,
          salePrice: data.priceInShop,
          deliveryPrice: data.priceDelivery,
          gasPercent: data.gasCostPercent
        })

        this.db.listenData('materials', (data: any) => {
          if (data) {
            this.materialsList = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
          }
        })

        data.ingredients.forEach((material: any) => {
          this.db.listenData('materials/' + material.materialId, (m: any) => {
            let pricePerYield = this.calculateYieldPrice(m.price, m.yieldPercent);
            (this.recipeForm.get('ingredients') as FormArray).push(
              new FormGroup({
                materialId: new FormControl(material.materialId),
                name: new FormControl(m.name),
                unitSub: new FormControl(m.unitSub),
                pricePerUnit: new FormControl(m.price),
                pricePerYield: new FormControl(pricePerYield),
                qty: new FormControl(m.qty),
                qtyUse: new FormControl(material.usageQty) // เพิ่มช่องให้กรอกปริมาณที่ใช้ด้วย
              })
            );
          })
        });
      } else {
        this.addIngredient(); // เพิ่ม 1 แถวเริ่มต้น
      }

      setTimeout(() => {
        this.calculateCost();
      }, 2000);
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
        qtyUse: mat.qtyUse,
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

  updateRecipe() {
    if (this.recipeForm.valid) {
      const formValue: any = this.recipeForm.value
      const ingredients = formValue.ingredients.map((ing: any) => ({
        materialId: ing.materialId,
        usageQty: ing.qtyUse // ใช้ปริมาณที่กรอกในช่อง qtyUse
      }));
      const updatedRecipe = {
        name: formValue.menuName,
        priceInShop: formValue.salePrice,
        priceDelivery: formValue.deliveryPrice,
        gasCostPercent: formValue.gasPercent,
        ingredients: ingredients
      };
      this.db.updateData('menus/' + this.menuId, updatedRecipe).then(() => {
        alert('อัพเดทเมนูเรียบร้อยแล้ว');
        this.nav.back();
      }).catch((error) => {
        console.error('Error updating recipe:', error);
      });
    }
  }
}
