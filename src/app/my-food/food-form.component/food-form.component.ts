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

  displayFood: { proteins: string, carbohydrates: string, lipids: string } = {
    proteins: '',
    carbohydrates: '',
    lipids: ''
  };

  currentUser: User | null = null;

  constructor(
    private router: Router,
    private foodService: FoodService,
    private userLoginService: UserLoginService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userLoginService.getCurrentUser();

    if (this.food) {
      this.displayFood.proteins = this.convertToCommaFormat(this.food.proteins);
      this.displayFood.carbohydrates = this.convertToCommaFormat(this.food.carbohydrates);
      this.displayFood.lipids = this.convertToCommaFormat(this.food.lipids);
    }
  }

  onSubmit() {
    const userId = this.currentUser?.id;

    if (!userId) {
      console.error('User ID is undefined. Cannot create food');
      return;
    }

    this.food.proteins = this.parseNumber(this.displayFood.proteins);
    this.food.carbohydrates = this.parseNumber(this.displayFood.carbohydrates);
    this.food.lipids = this.parseNumber(this.displayFood.lipids);

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

  convertToCommaFormat(value: number): string {
    if (value != null) {
      return value.toFixed(2).replace('.', ',');
    }
    return '';
  }

  parseNumber(value: string | number): number {
    if (typeof value === 'string') {
      const formattedValue = value.replace(',', '.');
      return parseFloat(formattedValue);
    }
    return value;
  }

  backToFood (food: Food) {
    if (this.isEditMode) {
      this.router.navigate(['/my-food-detail', food.id]);
    } else {
      this.router.navigate(['/my-food'])
    }
  }

  preventLetters(event: KeyboardEvent) {
    const forbiddenKeys = ['e', 'E', '+', '-', ' '];
    const validKeys = ['.', ',', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete'];

    if (forbiddenKeys.includes(event.key)) {
        event.preventDefault();
        return;
    }

    if (!validKeys.includes(event.key) && event.key.length === 1) {
      event.preventDefault();
      return;
    }

    const currentValue = (event.target as HTMLInputElement).value;
    if ((event.key === '.' || event.key === ',') && (currentValue.includes('.') || currentValue.includes(','))) {
      event.preventDefault();
      return;
    }
  }
}
