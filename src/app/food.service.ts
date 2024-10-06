import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Food } from './my-food/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:8080/api/food'; // Url de l'api Spring Boot

  constructor(private http:HttpClient) { }

  getAllFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  getFoodById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`);
  }

  getFoodByNameIgnoreCase(term: string): Observable<Food[]> {
    if(term.length <=1) { // Si dans le champ il y à moins de 2 lettres,
      return of([]); // il retourne un tableau vide ou la forme d'un flux
    }
    return this.http.get<Food[]>(`${this.apiUrl}/search/ignore-case?name=${term}`);
  }

  createFood(food: Food): Observable<Food> {
    return this.http.post<Food>(this.apiUrl, food);
  }

  updateFood(id: number, food: Food): Observable<Food> {
    return this.http.put<Food>(`${this.apiUrl}/${id}`, food);
  }

  deleteFood(id: number): Observable<Food> {
    return this.http.delete<Food>(`${this.apiUrl}/${id}`)
  }
}
