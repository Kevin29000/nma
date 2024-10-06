import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Food } from './food';
import { FOOD } from './food-list';
import { MyFoodBorderCardDirective } from './my-food-border-card.directive';
import { FoodService } from '../food.service'; //
import { FormatDecimalPipe } from './format-decimal.pipe';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { SortPipe } from './sort.pipe';
import { SearchFoodComponent } from '../profile/search-food/search-food.component';

@Component({
  selector: 'app-my-food',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MyFoodBorderCardDirective,
    FormatDecimalPipe,
    SortPipe,
    SearchFoodComponent
  ],
  templateUrl: './my-food.component.html',
  styles: []
})
export class MyFoodComponent implements OnInit {

  foods: Food[] = [];

  // foodList:Food[] = FOOD; // la propriété foodList est de type Food et est un tableau et contient la liste d'aliments FOOD, :Food[] c'est pour ne pas mettre n'importe quoi dans foodList
  
  constructor(
    private router: Router,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
      this.loadFoods();
  }

  loadFoods(): void {
    this.foodService.getAllFoods().subscribe((data) => {
      this.foods = data;
    });
  }

  goToCreateFood () {
    this.router.navigate(['my-food/create'])
  }

  goToFood (food: Food) {
    this.router.navigate(['/my-food-detail', food.id]);
  }

  /* formatDecimal(value: number): string {
    return value.toString().replace('.', ',');
  } */
}
