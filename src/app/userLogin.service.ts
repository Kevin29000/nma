import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './profile/user.model';
import { UserActivity } from './profile/user-activity';
import { UserGender } from './profile/user-gender';
import { UserGoal } from './profile/user-goal';
import { UserLogin } from './userLogin';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private apiUrl = 'https://nma-app-c29adc8f1557.herokuapp.com/api/users';
  public isNewUser: boolean = false; // Propriété pour suivre si l'utilisateur est nouveau

  constructor(private http:HttpClient) { }

  public getNutritionalNeeds(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/jason' });
    return this.http.get<any>(`${this.apiUrl}/${id}/nutrition`, { headers });
  }

  login(userLogin: UserLogin): Observable<User> {
    const headers = new HttpHeaders({ 'Content-type': 'application/json'});
    return this.http.post<User>(`${this.apiUrl}/login`, userLogin, { headers })
      .pipe(
        map((user: User) => {
          if (user) {
            if (user.activity) {
              user.activityLabel = UserActivity[user.activity.toUpperCase() as keyof typeof UserActivity]; ////////////////////////////////////////
            }
            if (user.gender) {
              user.genderLabel = UserGender[user.gender.toUpperCase() as keyof typeof UserGender];
            }
            if (user.goal) {
              user.goalLabel = UserGoal[user.goal.toUpperCase() as keyof typeof UserGoal];
            }
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.resetNewUser(); // Réinitialiser l'indicateur lors de la déconnexion
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  public createUserCredentials(credentials: {email: string, password: string}): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const userCredentials = {
      email: credentials.email,
      password: credentials.password
    };

    return this.http.post<User>(`${this.apiUrl}/create-credentials`, userCredentials, { headers }).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isNewUser = true // Marquer l'utilisateur comme nouveau
        }
        return user;
      })
    );
  }

  public getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  public updateUser(id: number, user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Les headers sont nécessaires pour s'assurer que les données sont envoyées au bon format
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers }).pipe(
      map((updateUser: User) => {
        updateUser.activityLabel = UserActivity[updateUser.activity.toUpperCase() as keyof typeof UserActivity]; ////////////////////////////////////////
        updateUser.genderLabel = UserGender[updateUser.gender.toUpperCase() as keyof typeof UserGender];
        updateUser.goalLabel = UserGoal[updateUser.goal.toUpperCase() as keyof typeof UserGoal];
        localStorage.setItem('currentUser', JSON.stringify(updateUser)); // Met à jour le currentUser pour l'afficher dans profile
        return updateUser;
      })
    );
  }

  public updateUserCredentials(id: number, credentials: {email: string, currentPassword: string, newPassword: string}): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.apiUrl}/${id}/update-credentials`, credentials, { headers }).pipe(
      map((updateUser: User) => {
        updateUser.activityLabel = UserActivity[updateUser.activity.toUpperCase() as keyof typeof UserActivity]; ////////////////////////////////////////
        updateUser.genderLabel = UserGender[updateUser.gender.toUpperCase() as keyof typeof UserGender];
        updateUser.goalLabel = UserGoal[updateUser.goal.toUpperCase() as keyof typeof UserGoal];
        localStorage.setItem('currentUser', JSON.stringify(updateUser));
        return updateUser;
      })
    );
  }

  public deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }

   // Méthode pour réinitialiser l'indicateur
   public resetNewUser(): void {
    this.isNewUser = false;
  }
}
