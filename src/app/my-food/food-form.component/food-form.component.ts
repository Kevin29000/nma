import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Food } from '../food';
import { Router } from '@angular/router';
import { FoodService } from '../../food.service';
import { LoaderComponent } from '../loader/loader.component';
import { UserLoginService } from '../../userLogin.service';
import { User } from '../../profile/user.model';

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
export class FoodFormComponent implements OnInit {
  @Input() food: Food;
  @Input() isEditMode: boolean = false;

  currentUser: User | null = null;

  constructor(
    private router: Router,
    private foodService: FoodService,
    private userLoginService: UserLoginService
  ) {}

  ngOnInit(): void {
      this.currentUser = this.userLoginService.getCurrentUser();
  }

  onSubmit() {
    const userId = this.currentUser?.id;

    if (!userId) {
      console.error('User ID is undefined. Cannot create food');
      return;
    }

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
      this.foodService.createFood(this.food, userId).subscribe({
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
