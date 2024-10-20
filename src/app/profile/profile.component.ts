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

    if (this.currentUser && this.currentUser.birthdate) {
      this.currentUser.age = this.calculateAge(this.currentUser.birthdate);
    }
  }

  calculateAge(birthdate: string): number | null {
    if (!birthdate) {
      return null;
    }

    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Si le mois d'anniversaire n'est pas encore passé, soustraire 1
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
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
