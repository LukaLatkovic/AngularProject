import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: Recipe[] = [
    new Recipe('Test recept', 'Ovo je test', 'https://img.koket.se/media/raraka-grundrecept-ny.jpg'),
    new Recipe('Test recept 2','Test 2','https://www.dijamant.rs/wp-content/uploads/2017/12/Recept-Za-Stari-Prebranac-8-820x490.jpg')
  ];


  constructor() { }

  getRecipes(){
    return this.recipes.slice();
  }
}
