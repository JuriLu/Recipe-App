import {IngredientModel} from "./ingredient.model";

export class RecipeModel{
  public id?: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: IngredientModel[];

  constructor(name:string,desc:string,imagePath:string,ingredients:IngredientModel[],id?:string) {
    this.name  = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.id = id;
  }
}
