import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfileFormComponent } from '../user-profile-form/user-profile-form.component';
import { Router } from '@angular/router';
import { UserLoginService } from '../../userLogin.service';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    UserProfileFormComponent
  ],
  templateUrl: './edit-profile.component.html',
  styles: []
})
export class EditProfileComponent implements OnInit {
  user: User | null = null;
  isNewUser: boolean = false;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService
  ) {}

  ngOnInit(): void {
    this.user = this.userLoginService.getCurrentUser(); // charger l'utilisateur depuis le localStorage
    this.isNewUser = this.userLoginService.isNewUser;

    // Réinitialiser l'indicateur après utilisation
    this.userLoginService.resetNewUser();
  }
}
