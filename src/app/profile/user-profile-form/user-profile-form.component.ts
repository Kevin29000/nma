import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class UserProfileFormComponent implements OnInit {
  @Input() user: User | null = null;
  @Input() isNewUser: boolean = false;

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

  ngOnInit(): void {
      if (this.user && this.user.birthdate) {
        this.user.birthdate = this.formatDateForDisplay(this.user.birthdate);
      }
  }

  onSubmit() {
    if (this.user) {
      const formattedBirthDate = this.formatBirthDate(this.user.birthdate);

      if (formattedBirthDate) {
        this.user.birthdate = formattedBirthDate;
      } else {
        console.error('Format de date invalide');
        return;
      }

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

  formatBirthDate(userInput: string): string | null {
    const regex = /^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/;
    const match = userInput.match(regex);

    if (match) {
      const day = match[1];
      const month = match[2];
      const year = match[3];

      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  }

  formatDateForDisplay(date: string): string {
    if (!date) {
      return '';
    }

    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  navigateBack() {
    if (this.isNewUser) {
      this.router.navigate(['/login']);
    } else {
    this.router.navigate(['/profile']);
    }
  }
}
