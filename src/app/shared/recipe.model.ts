import { Ingredient } from "./ingredient.model";

export class Recipe {
    private id: number;
    private name: string;
    private description: string;
    private imagePath: string;
    private ingredients: Ingredient[];

    constructor(id: number, name: string, desc: string, imagePath: string, ings: Ingredient[]) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ings;
    }

    public getId() {
      return this.id;
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
