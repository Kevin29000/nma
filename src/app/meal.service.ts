import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from './nutritional-monitoring/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'https://nma-app-c29adc8f1557.herokuapp.com/api/meals';

  constructor(private http:HttpClient) { }

  // Récupérer tous les repas
  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiUrl);
  }

  // Récupérer tout les repas d'un utilisateur
  getMealsByUserId(userId: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Récupérer un seul repas par ID
  getMealsById(id: number): Observable<Meal> {
    return this.http.get<Meal>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau repas
  createMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.apiUrl, meal);
  }

  // Mettre à jour un repas existant
  updateMeal(id: number, meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiUrl}/${id}`, meal);
  }

  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
