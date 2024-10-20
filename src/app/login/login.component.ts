import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserLoginService } from '../userLogin.service';
import { UserLogin } from '../userLogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    FormsModule // pour pouvoir l'utiliser ngModel dans le template
  ],
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  message: string = 'Vous êtes déconnecté';

  userLogin: UserLogin = new UserLogin();
  errorMessage: string | null = null;

  constructor(
    private userLoginService: UserLoginService,
    private router: Router
  ) {}

  setMessage() {
    if (this.userLoginService.isLoggedIn()) {
      this.message = ('Vous êtes connecté')
    } else {
      this.message = ('Identifiant ou mot de passe incorrect')
    }
  }

  login() {
    this.message = 'Chargement ...';
    this.userLoginService.login(this.userLogin).subscribe(
      (user) => {
        console.log("Login successful, navigating to profile...");
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.message = 'Email ou mot de passe incorrect';
      }
    );
  }

  goToCreateAccount() {
    this.router.navigate(['/create-account'])
  }
}
