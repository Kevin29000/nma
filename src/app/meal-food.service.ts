import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MealFood } from './nutritional-monitoring/meal-food';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealFoodService {
  private apiUrl = 'https://nma-app-c29adc8f1557.herokuapp.com/api/meals';

  constructor(private http:HttpClient) { }

  // Récupérer les aliment d'un repas
  getFoodsForMeal(mealId: number): Observable<MealFood[]> {
    return this.http.get<MealFood[]>(`${this.apiUrl}/${mealId}/foods`);
  }

  // Ajouter un aliment à un repas
  addFoodToMeal(mealId: number, mealFood: MealFood): Observable<MealFood> {
    return this.http.post<MealFood>(`${this.apiUrl}/${mealId}/foods`, mealFood);
  }

  // Supprimer un aliment d'un repas
  deleteFoodFromMeal(mealId: number, foodId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${mealId}/foods/${foodId}`);
  }

  updateMealFoodQuantity(mealId: number, mealFoodId: number, mealFood: MealFood): Observable<MealFood> {
    return this.http.put<MealFood>(`${this.apiUrl}/${mealId}/foods/${mealFoodId}`, mealFood);
  }
}
