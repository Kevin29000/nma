import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserLoginCredentialsFormComponent } from '../user-login-credentials-form/user-login-credentials-form.component';
import { UserLoginService } from '../../userLogin.service';
import { User } from '../user.model';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    UserLoginCredentialsFormComponent
  ],
  templateUrl: './create-user.component.html',
  styles: []
})
export class CreateUserComponent {
  user: User | null = { 
    id: 99,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    height: 0,
    weight: 0,
    gender: '',
    birthdate: '',
    age: 0,
    activity: '',
    goal: '',
  };

  constructor(
    private router: Router,
    private userLoginService: UserLoginService
  ) {}
}
