import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Food } from '../food';
import { FOOD } from '../food-list';
import { FoodService } from '../../food.service';
import { FormatDecimalPipe } from '../format-decimal.pipe';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    FormatDecimalPipe,
    LoaderComponent
  ],
  templateUrl: './food-detail.component.html',
  styles: [ ]
})
export class FoodDetailComponent implements OnInit {

  // foodList: Food[] = FOOD;
  food: Food|undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    /* const foodId: string|null = this.route.snapshot.paramMap.get('id');
    if (foodId) {
      this.food = this.foodList.find(food => food.id == +foodId);
    } */

    const foodId : string|null = this.route.snapshot.paramMap.get('id');
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

  goToMyFood() {
    this.router.navigate(['/my-food']);
  }

  deleteFood() {
    if(this.food && this.food.id) {
      this.foodService.deleteFood(this.food.id).subscribe({
        next: () => {
          console.log('Aliment supprimé avec succès');
          this.goToMyFood();
        },
        error: (error) => {
          console.error('Erreur lors de la suppressions de l\'aliment', error);
        }
      });
    }
  }

  confirmDeleteFood() {
    const confirmation = window.confirm('Êtes vous sûr de vouloir supprimer cet aliment ?');
    if (confirmation) {
      this.deleteFood();
    }
  }

  goToEditFood(food: Food) {
    this.router.navigate(['my-food-detail/edit', food.id]);
  }
  
}
