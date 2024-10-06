import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserLoginService } from '../userLogin.service';
import { User } from './user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private userLoginService: UserLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userLoginService.getCurrentUser();
  }

  logout() {
    this.userLoginService.logout();
    this.router.navigate(['/login']);
  }

  goToUpdateUserCredentials() {
    if (this.currentUser){
      this.router.navigate(['/profile/edit-credentials']);
    }
  }

  goToUpdateUserProfile() {
    if (this.currentUser){
      this.router.navigate(['/profile/edit-profile']);
    }
  }

  deleteUser(){
    if(this.currentUser) {
      if(confirm('Êtes vous sûr de vouloir supprimer votre compte ?')) {
        this.userLoginService.deleteUser(this.currentUser.id).subscribe(
          () => {
            this.userLoginService.logout();
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Erreur lors de la suppression du compte ', error);
            alert('Une erreur s\'est produite lors de la suppressions de votre compte. Veuillez réessayer.');
          }
        );
      }
    } else {
      alert('Aucun utilisateur connecté');
    }
  }
}
