import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserLoginService } from './userLogin.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'nutrition-monitoring-app';

  // Le code qui suit à pour but de masquer la barre de menu sur la page de login
  showAppContent: boolean = true;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService
  ) {
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  checkRoute() {
    const isNewUser = this.userLoginService.isNewUser;

    this.showAppContent = !isNewUser && this.router.url !== '/login' && this.router.url !== '/create-account';
  }
}
