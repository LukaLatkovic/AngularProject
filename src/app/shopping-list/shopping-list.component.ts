import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]=[
    new Ingredient('Sastojak 1', 2),
    new Ingredient('Satojak 2', 4)
  ];

  constructor() { }

  ngOnInit() {
  }
onIngAdded(ing: Ingredient){
  this.ingredients.push(ing);
}
}
