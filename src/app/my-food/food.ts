export class Food { // défini ce qu'est un aliment
    id: number;
    userId: number;
    defaultFoodId?: number | null;
    name: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    lipids: number;
    isDefault: boolean;

    constructor(data: Partial<Food>) {
        this.id = data.id ?? 0;              // Initialiser avec une valeur par défaut
        this.userId = data.userId ?? 0;      // Initialiser avec une valeur par défaut
        this.defaultFoodId = data.defaultFoodId ?? null; // Peut être nul pour un aliment personnalisé
        this.name = data.name ?? '';
        this.calories = data.calories ?? 0;
        this.proteins = data.proteins ?? 0;
        this.carbohydrates = data.carbohydrates ?? 0;
        this.lipids = data.lipids ?? 0;
        this.isDefault = data.isDefault ?? false; // Par défaut, ce n'est pas un aliment par défaut
    }
}