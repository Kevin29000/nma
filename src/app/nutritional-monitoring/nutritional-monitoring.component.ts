import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FOOD } from '../my-food/food-list';
import { Food } from '../my-food/food';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nutritional-monitoring',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
  templateUrl: './nutritional-monitoring.component.html',
  styles: []
})

export class NutritionalMonitoringComponent implements OnInit {

  foodList:Food[] = FOOD; // la propriété foodList est de type Food et est un tableau et contient la liste d'aliments FOOD, :Food[] c'est pour ne pas mettre n'importe quoi dans foodList

  






  
  ngOnInit() {
    console.table(this.foodList); // this pour aller chercher la variable qui se trouve en dehors de ngOnInit
  }

  selectFood(event: MouseEvent) { // la méthode selectFood prend en paramètre event qui est de type MouseEvent
    const index: number = +(event.target as HTMLInputElement).value; // création de la const index qui est de type number qui prend pour valeur l'event du template
    console.log(`Vous avez cliqué sur l'aliment ${this.foodList[index].name}`)
  }

}
