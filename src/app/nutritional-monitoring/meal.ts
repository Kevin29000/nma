import { User } from "../profile/user.model";
import { MealFood } from "./meal-food";

export interface Meal {
    id: number;
    name: string;
    date: Date;
    totalMealCalories: number;
    totalMealProteins: number;
    totalMealCarbohydrates: number;
    totalMealLipids: number;
    foods: MealFood[]; // Liste des aliments dans ce repas
    user?: User;
}