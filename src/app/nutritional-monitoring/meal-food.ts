import { Food } from "../my-food/food";
import { Meal } from "./meal";

export interface MealFood {
    id: number;
    food: Food;
    quantity: number;
    caloriesByQuantity: number;
    proteinsByQuantity: number;
    carbohydratesByQuantity: number;
    lipidsByQuantity: number;
    meal: Meal | null;
}