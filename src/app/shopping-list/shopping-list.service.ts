import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingChanged= new EventEmitter<Ingredient[]>();
  startedEditing= new Subject<number>();

  ingredients: Ingredient[]=[
    new Ingredient('Sastojak 1', 2),
    new Ingredient('Satojak 2', 4)
  ];

  constructor() { }

  getIng(id: number){
    return this.ingredients[id];
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredients(ing: Ingredient){
    this.ingredients.push(ing);
    this.ingChanged.emit(this.ingredients.slice());
  }

  addIngs(ing: Ingredient[]){
    this.ingredients.push(...ing);
    this.ingChanged.emit(this.ingredients.slice());
  }

  updateIng(id: number, ing: Ingredient){
    this.ingredients[id]= ing;
    this.ingChanged.next(this.ingredients.slice());
  }

  deleteIng(id: number){
    this.ingredients.splice(id,1);
    this.ingChanged.next(this.ingredients.slice());
  }
}
