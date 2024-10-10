import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { FoodService } from '../../food.service';
import { Food } from '../../my-food/food';
import { User } from '../../profile/user.model';
import { UserLoginService } from '../../userLogin.service';

@Component({
  selector: 'app-search-food',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
  templateUrl: './search-food.component.html',
  styles: []
})
export class SearchFoodComponent implements OnInit {
  serchTerms = new Subject<string>(); // Représente un flux de donnée dans le temps des recherches de l'utilisateur {....."a"...."ab"...."abz"...."ab"}, pour stocker ça on utilise un subject, c'est comme un observable "pilotable"
  foods$: Observable<Food[]>; // Afficher en mirroir le resultat qui correspondent aux rechrches de searchTerms, a puis ab puis abz puis ab

  currentUser: User | null = null;

  constructor(
    private router: Router,
    private foodService: FoodService,
    private userLoginService: UserLoginService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userLoginService.getCurrentUser();

    const userId = this.currentUser?.id;

    if (userId !== undefined) {
      this.foods$ = this.serchTerms.pipe(
        debounceTime(300), // Crée une latance avant de faire une requête au serveur, pour eviter de faire une requete à chaque saisie dans le champ il n'en fera que 300 miliseconde apres la fin de la saisie
        distinctUntilChanged(), // Permet d'éviter de faire 2 fois la même demande au serveur par exemple si l'utilisateur fait une faut de frappe et reviens en arrière
        switchMap((term) => this.foodService.getUserFoodsByNameContainingIgnoreCase(userId, term)) // Fait la requête au serveur
      );
    }
  }

  search(term: string) { // Sera utiliser dans le template
    this.serchTerms.next(term); // Pousse le terme saisie par l'utilisateur dans le subject
  }

  goToDetail(food: Food) {
    const link = ['/my-food-detail', food.id];
    this.router.navigate(link);
  }
}
