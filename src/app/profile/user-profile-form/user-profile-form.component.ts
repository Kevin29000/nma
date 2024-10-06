import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../my-food/loader/loader.component';
import { UserLoginService } from '../../userLogin.service';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserActivity } from '../user-activity';
import { UserGender } from '../user-gender';
import { UserGoal } from '../user-goal';

@Component({
  selector: 'app-user-profile-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    LoaderComponent
  ],
  templateUrl: './user-profile-form.component.html',
  styles: []
})
export class UserProfileFormComponent {
  @Input() user: User | null = null;

  Activity = UserActivity;
  activities = Object.keys(UserActivity).map(key => ({ key, value: UserActivity[key as keyof typeof UserActivity] }));

  Gender = UserGender;
  genders = Object.keys(UserGender).map(key => ({ key, value: UserGender[key as keyof typeof UserGender] }));

  Goal = UserGoal;
  goals = Object.keys(UserGoal).map(key => ({ key, value: UserGoal[key as keyof typeof UserGoal] }));

  constructor (
    private router: Router,
    private userLoginService: UserLoginService
  ) {}

  onSubmit() {
    if (this.user) {
      this.userLoginService.updateUser(this.user.id, this.user).subscribe(
        () => {
          console.log('Profil mis à jour');
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du profile', error);
        }
      );
    }  
  }

  backToProfile() {
    this.router.navigate(['/profile']);
  }
}
