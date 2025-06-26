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
    ingredients: new FormArray([]),
    salePrice: new FormControl(0),
    deliveryPrice: new FormControl(0),
    gasPercent: new FormControl(10),
    cogPercent: new FormControl(5),
  });

  materialsList: any[] = [];
  totalCost: number = 0;
  profitSale = 0;
  profitDelivery = 0;
  margin = 0;

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
      }
    })
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
      });
    }
  }

  calculateCost() {
    const form: any = this.recipeForm.value;
    const matCost = form.ingredients.reduce((sum: number, ing: any) => {
      return sum + ing.qty * ing.pricePerUnit;
    }, 0);

    const gas = matCost * (form.gasPercent / 100);
    const cog = matCost * (form.cogPercent / 100);
    this.totalCost = matCost + gas + cog;
    this.profitSale = form.salePrice - this.totalCost;
    this.profitDelivery = form.deliveryPrice - this.totalCost;
    this.margin = form.salePrice > 0 ? (this.profitSale / form.salePrice) * 100 : 0;
  }
}
