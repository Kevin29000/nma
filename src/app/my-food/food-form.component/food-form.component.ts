import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Food } from '../food';
import { Router } from '@angular/router';
import { FoodService } from '../../food.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-food-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    LoaderComponent
  ],
  templateUrl: './food-form.component.html',
  styles: ''
})
export class FoodFormComponent {
  @Input() food: Food;
  @Input() isEditMode: boolean = false;

  constructor(
    private router: Router,
    private foodService: FoodService
  ) {}

  onSubmit() {
    if (this.isEditMode) {
      this.foodService.updateFood(this.food.id, this.food).subscribe(
        () => {
          this.router.navigate(['my-food-detail', this.food.id]);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'aliment', error);
        }
      );
    } else {
      this.foodService.createFood(this.food).subscribe({
        next: (response: Food) => {
          console.log('Aliment créé avec succès ', response);
          this.router.navigate(['/my-food'])
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'aliment ', error);
        }
      });
    }
  }

  /*
  onSubmit() {
    // console.log('Submit form !')
    // this.router.navigate(['/my-food-detail', this.food.id])

    if (this.food) {
      this.foodService.updateFood(this.food.id, this.food).subscribe(
        () => {
          this.router.navigate(['my-food-detail', this.food.id]);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'aliment', error);
        }
      );
    }
  } */

  backToFood (food: Food) {
    if (this.isEditMode) {
      this.router.navigate(['/my-food-detail', food.id]);
    } else {
      this.router.navigate(['/my-food'])
    }
  }
}
