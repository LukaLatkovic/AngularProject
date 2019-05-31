import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode= false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private rpService: RecipeService, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id= +params['id'];
        this.editMode= params['id'] !=null;
        this.onInit();
      }
    );
  }

  onSubmit(){
    const newRp= new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients']);
    if(this.editMode){
      this.rpService.updateRecipe(this.id, newRp);
    } else{
      this.rpService.addRecipe(newRp);
    }
    
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  getControls(){
    return (this.recipeForm.get('ingredients') as FormArray).controls;

  }

  onAddIng(){
    this.getControls().push(
      new FormGroup({
        'name':new FormControl(null, Validators.required),
        'amount':new FormControl(null, [Validators.required])
      })
    )
  }

  private onInit(){
    let rpName='';
    let imgPath='';
    let desc='';
    let rpIng= new FormArray([]);

    if(this.editMode){
      const recipe=this.rpService.getRecipe(this.id);
      rpName=recipe.name;
      imgPath=recipe.imagePath;
      desc=recipe.description;
      if(recipe['ingredients']){
        for(let ing of recipe.ingredients){
          rpIng.push(new FormGroup({
            'name': new FormControl(ing.name),
            'amount': new FormControl(ing.amount)
          }));
        }
      }
    }

    this.recipeForm=new FormGroup({
      'name': new FormControl(rpName),
      'imagePath': new FormControl(imgPath),
      'description': new FormControl(desc),
      'ingredients': rpIng
    });

  }

}
