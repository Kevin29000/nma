import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserLoginCredentialsFormComponent } from '../user-login-credentials-form/user-login-credentials-form.component';
import { Router } from '@angular/router';
import { UserLoginService } from '../../userLogin.service';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-credentials',
  standalone: true,
  imports: [
    CommonModule,
    UserLoginCredentialsFormComponent
  ],
  templateUrl: './edit-credentials.component.html',
  styles: []
})
export class EditCredentialsComponent implements OnInit {
  user: User | null = null;
  isUpdating: boolean = true;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService
  ) {}

  ngOnInit(): void {
    this.user = this.userLoginService.getCurrentUser(); // charger l'utilisateur depuis le localStorage
  }
}
