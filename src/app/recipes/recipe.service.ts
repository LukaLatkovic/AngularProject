import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
recipeSelected= new EventEmitter<Recipe>();

  recipeChanged=new Subject<Recipe[]>();

  recipes: Recipe[] = [
    new Recipe('Test recept', 'Ovo je test', 'https://img.koket.se/media/raraka-grundrecept-ny.jpg',[
      new Ingredient('Sastojak 1', 4),
      new Ingredient('Test 1', 24)
    ]),
    new Recipe('Test recept 2','Test 2','https://www.dijamant.rs/wp-content/uploads/2017/12/Recept-Za-Stari-Prebranac-8-820x490.jpg',[
      new Ingredient('Sastojak 2', 14),
      new Ingredient('Test 2', 224)
    ])
  ];


  constructor(private slService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  adIngToSL(ing: Ingredient[]){
    this.slService.addIngs(ing);
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addRecipe(rp:Recipe){
    this.recipes.push(rp);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe:Recipe){
    this.recipes[id]=recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number){
    this.recipes.splice(id,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
