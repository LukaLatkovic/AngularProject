import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // @Output() recipeWasSelected=new EventEmitter<Recipe>();

  recipes: Recipe[] = [];

  constructor(private rpServise:RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.rpServise.recipeChanged.subscribe(
      (recipes: Recipe[])=>{
        this.recipes=recipes;
      }
    )
    this.recipes=this.rpServise.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }
}
