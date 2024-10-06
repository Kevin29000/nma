import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { ActivatedRoute } from '@angular/router';
import { FOOD } from '../food-list';
import { FoodFormComponent } from '../food-form.component/food-form.component';
import { FoodService } from '../../food.service';

@Component({
  selector: 'app-edit-food',
  standalone: true,
  imports: [CommonModule, FoodFormComponent],
  templateUrl: './edit-food.component.html',
  styles: ''
})
export class EditFoodComponent implements OnInit {
  // foodList:Food[] = FOOD;
  food: Food|undefined;

  constructor(
    private router: ActivatedRoute,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    /* const foodId: string|null = this.router.snapshot.paramMap.get('id');
    if (foodId) {
      this.food = this.foodList.find(food => food.id == +foodId);
    }
    else {
      this.food = undefined;
    } */

    const foodId: string|null = this.router.snapshot.paramMap.get('id');
    if (foodId) {
      this.loadFood(+foodId);
    }
  }

  loadFood(id: number): void {
    this.foodService.getFoodById(id).subscribe(
      (data) => {
        this.food = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'aliment', error)
      }
    );
  }
}
