import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MealService } from '../meal.service';
import { MealFoodService } from '../meal-food.service';
import { User } from '../profile/user.model';
import { UserLoginService } from '../userLogin.service';
import { Meal } from './meal';
import { MealFood } from './meal-food';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../food.service';
import { Food } from '../my-food/food';
import { SortPipe } from '../my-food/sort.pipe';
import { MyFoodBorderCardDirective } from '../my-food/my-food-border-card.directive';
import { FormatDecimalPipe } from '../my-food/format-decimal.pipe';
import { NutritionCalculations } from '../nutritional-needs/nutrition-calculations';
import { IntegerFormatPipe } from '../nutritional-needs/integer-format.pipe';
import { SearchFoodMonitoringComponent } from './search-food-monitoring/search-food-monitoring.component';

@Component({
  selector: 'app-nutritional-monitoring',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    FormsModule,
    SortPipe,
    MyFoodBorderCardDirective,
    FormatDecimalPipe,
    IntegerFormatPipe,
    SearchFoodMonitoringComponent
  ],
  templateUrl: './nutritional-monitoring.component.html',
  styles: []
})

export class NutritionalMonitoringComponent implements OnInit {

  isAddingMeal = false;
  newMealName: string = '';
  newMealDate: string = '';

  isEditMealFood = false;
  selectedMealFood: MealFood | null = null;
  newQuantity: number = 0;

  isAddFood = false;

  selectedMeal: Meal | null = null;

  isDetailFood = false;
  selectedFood: Food | null = null;

  meals: Meal[] = [];
  currentUser: User | null = null;

  totalDailyCalories: number = 0;
  totalDailyProteins: number = 0;
  totalDailyCarbohydrates: number = 0;
  totalDailyLipids: number = 0;

  foodsList: Food[] = [];

  nutritionalNeeds: NutritionCalculations | null = null;

  constructor(
    private userLoginService: UserLoginService,
    private mealService: MealService,
    private mealFoodService: MealFoodService,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userLoginService.getCurrentUser();
    this.loadMeal();

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

  loadMeal() {
    const userId = this.currentUser?.id;

    if (userId !== undefined) {
      this.mealService.getMealsByUserId(userId).subscribe((data) => {
        this.meals = data.map(meal => ({
          ...meal,
          foods: [] // Initialisation de la liste des aliments
        }));

        this.meals.forEach(meal => {
          this.loadFoodForMeal(meal);
        });
      }, error => {
        console.error("Erreur lors de la récupération des repas", error);
      });
    } else {
      console.error("l\'utilisateur n\'est pas connecté");
    }
  }

  loadFoodForMeal(meal: Meal) {
    const userId = this.currentUser?.id;
    
    if(userId !== undefined) {
      this.mealFoodService.getFoodsForMeal(meal.id).subscribe((data: MealFood[]) => {
        meal.foods = data.map(mealFood => ({
          ...mealFood,
          meal: meal,
                caloriesByQuantity: (mealFood.food.calories * mealFood.quantity) / 100, // Calculer les calories par quantité
                proteinsByQuantity: (mealFood.food.proteins * mealFood.quantity) / 100, // Calculer les protéines par quantité
                carbohydratesByQuantity: (mealFood.food.carbohydrates * mealFood.quantity) / 100, // Calculer les glucides par quantité
                lipidsByQuantity: (mealFood.food.lipids * mealFood.quantity) / 100 // Calculer les lipides par quantité
        }));

        this.calculateMealTotals(meal);
        this.calculateDailyTotals();
      }, error => {
        console.error("Erreur lors de la récupération des aliments du repas", error);
      });
    } else {
      console.error("l\'utilisateur n\'est pas connecté");
    }
  }

  calculateMealTotals(meal: Meal) {
    let totalCalories = 0;
    let totalProteins = 0;
    let totalCarbohydrates = 0;
    let totalLipids = 0;

    if(meal.foods && meal.foods.length > 0) {
      meal.foods.forEach(mealFood => {
        totalCalories += mealFood.caloriesByQuantity;
        totalProteins += mealFood.proteinsByQuantity;
        totalCarbohydrates += mealFood.carbohydratesByQuantity;
        totalLipids += mealFood.lipidsByQuantity;
      });
    }

    meal.totalMealCalories = totalCalories;
    meal.totalMealProteins = totalProteins;
    meal.totalMealCarbohydrates = totalCarbohydrates;
    meal.totalMealLipids = totalLipids;
  }

  calculateDailyTotals() {
    this.totalDailyCalories = 0;
    this.totalDailyProteins = 0;
    this.totalDailyCarbohydrates = 0;
    this.totalDailyLipids = 0;

    this.meals.forEach(meal => {
      if (meal.foods && meal.foods.length > 0) {
        meal.foods.forEach(mealFood => {
          this.totalDailyCalories += mealFood.caloriesByQuantity;
          this.totalDailyProteins += mealFood.proteinsByQuantity;
          this.totalDailyCarbohydrates += mealFood.carbohydratesByQuantity;
          this.totalDailyLipids += mealFood.lipidsByQuantity;
        });
      }
    });
  }

  openAddMealForm() {
    this.isAddingMeal = true;
    this.newMealDate = new Date().toISOString().split('T')[0]; // Préremplir avec la date du jour
  }

  cancelAddMeal() {
    this.isAddingMeal = false;
    this.newMealName = '';
    this.newMealDate = '';
  }

  onSubmitMealForm() {
    if (this.currentUser && this.newMealName && this.newMealDate) {
      const newMeal: Meal = {
        id: 0,
        name: this.newMealName,
        date: new Date(this.newMealDate),
        totalMealCalories: 0,
        totalMealProteins: 0,
        totalMealCarbohydrates: 0,
        totalMealLipids: 0,
        foods: [],
        user: this.currentUser
      };

      this.mealService.createMeal(newMeal).subscribe((createdMeal) => {
        this.meals.push(createdMeal);
        this.isAddingMeal = false;
        this.newMealName = '';
        this.newMealDate = '';
      }, (error) => {
        console.error("Erreur lors de l'ajout du repas", error);
      });
    }
  }

  openEditMealFood(mealFood: MealFood) {
    this.selectedMealFood = { ...mealFood }; // Clonage des données pour ne pas agir sur les données d'origines avant la validation
    this.newQuantity = this.selectedMealFood.quantity;
    this.isEditMealFood = true;
  }

  calculateCalories(mealFood: MealFood): number {
    return (mealFood.food.calories * this.newQuantity) / 100;
  }

  calculateProteins(mealFood: MealFood): number {
      return (mealFood.food.proteins * this.newQuantity) / 100;
  }

  calculateCarbohydrates(mealFood: MealFood): number {
      return (mealFood.food.carbohydrates * this.newQuantity) / 100;
  }

  calculateLipids(mealFood: MealFood): number {
      return (mealFood.food.lipids * this.newQuantity) / 100;
  }

  onSubmitMealFoodForm() {
    // Trouve le repas et l'aliment correspondant à celui édité
    const mealIndex = this.meals.findIndex(meal => 
        meal.foods.some(food => food.id === this.selectedMealFood?.id)
    );

    if (mealIndex !== -1 && this.selectedMealFood) {
        // Trouve l'aliment dans le repas sélectionné
        const foodIndex = this.meals[mealIndex].foods.findIndex(food => food.id === this.selectedMealFood?.id);

        if (foodIndex !== -1) {
            // Recalcule les valeurs nutritionnelles en fonction de la nouvelle quantité
            const updatedMealFood: MealFood = {
                ...this.selectedMealFood,
                caloriesByQuantity: this.calculateCalories(this.selectedMealFood),
                proteinsByQuantity: this.calculateProteins(this.selectedMealFood),
                carbohydratesByQuantity: this.calculateCarbohydrates(this.selectedMealFood),
                lipidsByQuantity: this.calculateLipids(this.selectedMealFood),
                quantity: this.newQuantity // Mettre à jour la quantité
            };

            // Met à jour l'objet original dans la liste des repas
            this.meals[mealIndex].foods[foodIndex] = updatedMealFood;
            this.calculateMealTotals(this.meals[mealIndex]);
        }
    }
    this.isEditMealFood = false;
    this.selectedMealFood = null;
  }

  cancelEditMealFood() {
    this.isEditMealFood = false;
    this.selectedMealFood = null;
    this.newQuantity = 0;
  }

  deleteFoodFromMeal(mealFood: MealFood | null) {
    if (!mealFood) {
      console.error("selectedMealFood est null");
      return; // Retour anticipé si null
    }

    if (confirm("Voulez-vous vraiment supprimer cet aliment de ce repas ?")) {
      const mealId = mealFood.meal?.id;
      const mealFoodId = mealFood.id;
  
      if (mealId && mealFoodId) {
        this.mealFoodService.deleteFoodFromMeal(mealId, mealFoodId).subscribe(() => {
          // Mise à jour de la liste des repas après la suppression
          const meal = this.meals.find(meal => meal.id === mealId);
          if (meal) {
            meal.foods = meal.foods.filter(food => food.id !== mealFoodId); // Retirer l'aliment de la liste des aliments
            this.calculateMealTotals(meal); // Recalculer les totaux du repas
            this.calculateDailyTotals(); // Recalculer les totaux journaliers
          }
          console.log("Aliment supprimé avec succès");
          this.cancelEditMealFood();
        }, error => {
          console.error("Erreur lors de la suppression de l'aliment", error);
        });
      } else {
        console.error("L'identifiant du repas ou de l'aliment est introuvable.");
      }
    }
  }

  deleteMeal(mealId: number) {
    if (confirm("Voulez-vous vraiment supprimer ce repas ?")) {
      this.mealService.deleteMeal(mealId).subscribe(() => {
        // Mise à jour de la liste des repas après la suppression
        this.meals = this.meals.filter(meal => meal.id !== mealId);
        this.calculateDailyTotals(); // Recalcule les totaux après suppression
        console.log("Repas supprimé avec succès");
      }, error => {
        console.error("Erreur lors de la suppression du repas", error);
      });
    }
  }

  openAddFoods(meal: Meal): void {
    this.selectedMeal = meal;
    const userId = this.currentUser?.id;

    if (userId !== undefined) {
      this.foodService.getUserAllFoods(userId).subscribe((data) => {
        this.foodsList = data;
        this.isAddFood = true;
      });
    } else {
      console.error('User ID is undefined');
      console.error(this.currentUser);
    }
  }

  closeAddFoods(): void {
    this.isAddFood = false;
  }

  openDetailFood(food: Food) {
    this.isAddFood = false;
    this.isDetailFood = true;
    this.selectedFood = food;
    this.newQuantity = 100;
  }

  closeDetailFood() {
    this.isAddFood = true;
    this.isDetailFood = false;
  }

  addFoodToMeal() {
    if (this.selectedFood && this.newQuantity > 0 && this.selectedMeal) {
      const newMealFood: MealFood = {
        id: 0,
        quantity: this.newQuantity,
        food: this.selectedFood,
        meal: null,
        caloriesByQuantity: (this.selectedFood.calories * this.newQuantity) /100,
        proteinsByQuantity: (this.selectedFood.proteins * this.newQuantity) /100,
        carbohydratesByQuantity: (this.selectedFood.carbohydrates * this.newQuantity) /100,
        lipidsByQuantity: (this.selectedFood.lipids * this.newQuantity) /100,
      };

      this.mealFoodService.addFoodToMeal(this.selectedMeal.id, newMealFood).subscribe(() => {
        this.loadFoodForMeal(this.selectedMeal!);
        this.isDetailFood = false;
        this.selectedFood = null;
        this.newQuantity = 0;
      }, error => {
        console.error("Erreur lors de l'ajout de l'aliment au repas", error);
      });
    } else {
      console.warn("Aucun aliment sélectionné ou quantité invalide");
    }
  }

  updateMacros() {
    if (this.selectedMealFood && this.selectedMealFood.food && this.newQuantity > 0) {
        // Calcul des macros en fonction de la nouvelle quantité
        this.selectedMealFood.caloriesByQuantity = (this.selectedMealFood.food.calories * this.newQuantity) / 100;
        this.selectedMealFood.proteinsByQuantity = (this.selectedMealFood.food.proteins * this.newQuantity) / 100;
        this.selectedMealFood.carbohydratesByQuantity = (this.selectedMealFood.food.carbohydrates * this.newQuantity) / 100;
        this.selectedMealFood.lipidsByQuantity = (this.selectedMealFood.food.lipids * this.newQuantity) / 100;
    } else {
        // Réinitialiser les valeurs si la quantité n'est pas valide
        if (this.selectedMealFood) {
            this.selectedMealFood.caloriesByQuantity = 0;
            this.selectedMealFood.proteinsByQuantity = 0;
            this.selectedMealFood.carbohydratesByQuantity = 0;
            this.selectedMealFood.lipidsByQuantity = 0;
        }
      }
  }

  originalCalories: number = 0;
  originalProteins: number = 0;
  originalCarbohydrates: number = 0;
  originalLipids: number = 0;

  updateMacros2() {
      if (this.selectedFood && this.newQuantity > 0) {
          // Mise à jour des macros en fonction de la nouvelle quantité
          const quantityFactor = this.newQuantity / 100;

          // Sauvegarde des valeurs d'origine si c'est la première fois que l'on les met à jour
          if (this.originalCalories === 0 && this.originalProteins === 0 && this.originalCarbohydrates === 0 && this.originalLipids === 0) {
              this.originalCalories = this.selectedFood.calories;
              this.originalProteins = this.selectedFood.proteins;
              this.originalCarbohydrates = this.selectedFood.carbohydrates;
              this.originalLipids = this.selectedFood.lipids;
          }

          // Mise à jour des macros
          this.selectedFood.calories = this.originalCalories * quantityFactor;
          this.selectedFood.proteins = this.originalProteins * quantityFactor;
          this.selectedFood.carbohydrates = this.originalCarbohydrates * quantityFactor;
          this.selectedFood.lipids = this.originalLipids * quantityFactor;
      } else {
          // Si la quantité n'est pas valide
          if (this.selectedFood) {
              this.selectedFood.calories = 0;
              this.selectedFood.proteins = 0;
              this.selectedFood.carbohydrates = 0;
              this.selectedFood.lipids = 0;
          }
      }
  }

  limitInputValue(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);

    if (value > 500) {
      input.value = '500';
    }
  }
}
