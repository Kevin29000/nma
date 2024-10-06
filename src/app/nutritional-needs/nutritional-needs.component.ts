import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserLoginService } from '../userLogin.service';
import { User } from '../profile/user.model';
import { IntegerFormatPipe } from './integer-format.pipe';
import { NutritionCalculations } from './nutrition-calculations';

@Component({
  selector: 'app-nutritional-needs',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    IntegerFormatPipe
  ],
  templateUrl: './nutritional-needs.component.html',
  styles: []
})
export class NutritionalNeedsComponent implements OnInit{
  currentUser: User | null = null;
  nutritionalNeeds: NutritionCalculations | null = null;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userLoginService.getCurrentUser();

    if(this.currentUser) {
      this.userLoginService.getNutritionalNeeds(this.currentUser.id).subscribe(
        (needs) => {
          this.nutritionalNeeds = needs;
        },
        (error) => {
          console.error('Erreur lors de la récupération des besoins nutritionnels', error);
        }
      );
    }
  }
}
