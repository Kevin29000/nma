import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  constructor() { }

  login(name: string, password: string): Observable<boolean> {
    const isLoggedIn = (name == 'pikachu' && password == 'pikachu');
    return of(isLoggedIn).pipe(delay(1000),tap(isLoggedIn => this.isLoggedIn = isLoggedIn)); // delay sert juste à simmuler la latence dee si j'ai une api
  }

  logout() {
    this.isLoggedIn = false;
  }
}
