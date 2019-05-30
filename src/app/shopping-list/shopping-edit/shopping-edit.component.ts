import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
 
@ViewChild('f') slForm: NgForm;
sub: Subscription;

editedItemIndex: number;
editedMode=false;
editedItem: Ingredient;

// @Output() ingredientAdded= new EventEmitter<Ingredient>();
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.sub=this.slService.startedEditing.subscribe(
    (index: number)=>{
      this.editedItemIndex=index;
      this.editedMode=true;
      this.editedItem=this.slService.getIng(index);
      this.slForm.setValue({name: this.editedItem.name, amount: this.editedItem.amount});
    }

    );
  }

  onSubmitForm(form: NgForm){
    const name= form.value.name;
    const amount =form.value.amount;
    const newIngredient= new Ingredient(name,amount);
    

    if(this.editedMode){
      this.slService.updateIng(this.editedItemIndex, newIngredient);
    }
    else{
      this.slService.addIngredients(newIngredient);
    }

    this.editedMode=false;
    this.slForm.reset();
    // this.ingredientAdded.emit(newIngredient);
  }

  onDelete(){
    this.slService.deleteIng(this.editedItemIndex);
    this.slForm.reset();
    this.editedMode=false;

  }
   
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
