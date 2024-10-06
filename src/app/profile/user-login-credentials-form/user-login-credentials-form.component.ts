import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../my-food/loader/loader.component';
import { Router } from '@angular/router';
import { UserLoginService } from '../../userLogin.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-login-credentials-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    LoaderComponent
  ],
  templateUrl: './user-login-credentials-form.component.html',
  styles: []
})
export class UserLoginCredentialsFormComponent {
  @Input() user: User | null = null;
  @Input() isUpdating: boolean = false;

  //Variables pour les mots de passe
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  passwordsDoNotMatch: boolean = false;

  email: string | null = null;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService
  ) {}

  ngOnChanges() {
    this.email = this.user ? this.user.email : null;
  }

  onSubmit() {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordsDoNotMatch = true;
        console.error('Les mots de passe ne correspondent pas');
        return;
      } else {
        this.passwordsDoNotMatch = false;
      }
  
      if (this.isUpdating) {
      // Vérifie que les mots de passe actuels et nouveaux ne sont pas vides
      if (!this.currentPassword || !this.newPassword) {
        console.error('Le mot de passe actuel et le nouveau mot de passe doivent être remplis');
        return;
      }
  
      if (this.user) {
        const updateCredentials = {
          email: this.user.email,
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        };
  
        this.userLoginService.updateUserCredentials(this.user.id, updateCredentials).subscribe(
          () => {
            console.log('Logs mis à jour');
            this.router.navigate(['/profile']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour des logs', error);
            console.error('Détails de l\'erreur:', error.error); // Détails supplémentaires
          }
        );
      } 
    } else {
      if (!this.newPassword || !this.email) {
        console.error('L\'email et le nouveau mot de passe doivent être remplis');
        return;
      }
      
      const createCredentials = {
        email: this.email,
        password: this.newPassword
      };

      this.userLoginService.createUserCredentials(createCredentials).subscribe(
        (createdUser: User) => {
          console.log('Identifiants crées');
          this.user = createdUser;
          this.router.navigate(['/profile/edit-profile']);
        },
        (error) => {
          console.error('Erreur lors de la création des logs', error);
          console.error('Détails de l\'erreur:', error.error); // Détails supplémentaires
        }
      );
    }
  }

  backToProfile() {
    this.router.navigate(['/profile']);
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }
}
