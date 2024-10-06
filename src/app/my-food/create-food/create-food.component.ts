import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FoodService } from '../../food.service';
import { FoodFormComponent } from '../food-form.component/food-form.component';
import { Food } from '../food';

@Component({
  selector: 'app-create-food',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    FoodFormComponent
  ],
  templateUrl: './create-food.component.html',
  styles: []
})
export class CreateFoodComponent {
  food: Food = {
    id: 0,
    name: '',
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    lipids: 0
  };

  constructor(
    private router: Router,
    private foodService: FoodService //
  ) {}

  /*
  onSubmit() {
    this.foodService.createFood(this.food).subscribe({
      next: (response: Food) => {
        console.log('Aliment créé avec succès ', response);
        this.router.navigate(['/my-food', response.id])
      },
      error: (error) => {
        console.error('Erreur lors de la création de l\'aliment ', error);
      }
    });
  } */
}
