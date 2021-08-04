import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    private name: string;
    private description: string;
    private imagePath: string;
    private ingredients: Ingredient[];

    constructor(name: string, desc: string, imagePath: string, ings: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ings;
    }

    public getName() : string {
      return this.name;
    }

    public getDescription() : string {
      return this.description;
    }

    public getImagePath() : string {
      return this.imagePath;
    }

    public getIngredients() : Ingredient[] {
      return this.ingredients;
    }

}
