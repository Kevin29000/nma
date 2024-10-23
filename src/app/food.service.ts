import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Food } from './my-food/food';
import { DefaultFood } from './my-food/default-food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'https://nma-app-c29adc8f1557.herokuapp.com/api/food';

  constructor(private http:HttpClient) { }

  // Récupérer tous les aliments (personnalisés + par défaut)
  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  // Récupérer tous les aliments (personnalisés + par défaut) d'un utilisateur
  getUserAllFoods(userId: number): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}/user-foods/${userId}`);
  }

  // Récupérer les aliments personnalisés d'un utilisateur spécifique
  getUserFoods(userId: number): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}/user-foods/${userId}`);
  }

  // Récupérer les aliments par défaut
  getDefaultFoods(): Observable<DefaultFood[]> {
    return this.http.get<DefaultFood[]>(`${this.apiUrl}/default`);
  }

  // Récupérer un aliment par son ID
  getFoodById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`);
  }

  // Rechercher des aliments personnalisés ou par défaut par nom (ignore case)
  getFoodByNameIgnoreCase(term: string): Observable<Food[]> {
    if(term.length <=1) { // Si dans le champ il y à moins de 2 lettres,
      return of([]); // il retourne un tableau vide ou la forme d'un flux
    }
    return this.http.get<Food[]>(`${this.apiUrl}/search/ignore-case?name=${term}`);
  }

  // Rechercher des aliments par défaut par nom (ignore case)
  getDefaultFoodByNameIgnoreCase(term: string): Observable<DefaultFood[]> {
    if (term.length <= 1) { 
      return of([]); 
    }
    return this.http.get<DefaultFood[]>(`${this.apiUrl}/default/search?name=${term}`);
  }

  // Rechercher des aliments par défaut par nom et id de l'utilisateur (ignore case)
  getUserFoodsByNameContainingIgnoreCase(userId: number, term: string): Observable<Food[]> {
    if(term.length <=1) { // Si dans le champ il y à moins de 2 lettres,
      return of([]); // il retourne un tableau vide ou la forme d'un flux
    }
    return this.http.get<Food[]>(`${this.apiUrl}/user-foods/search?userId=${userId}&name=${term}`);
  }

  // Créer un aliment personnalisé pour un utilisateur spécifique
  createFood(food: Food, userId: number): Observable<Food> {
    return this.http.post<Food>(`${this.apiUrl}/user/${userId}`, food);
  }

  // Mettre à jour un aliment personnalisé
  updateFood(id: number, food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.apiUrl}/${id}`, food);
  }

  // Supprimer un aliment
  deleteFood(id: number): Observable<Food> {
    return this.http.delete<Food>(`${this.apiUrl}/${id}`)
  }
}
