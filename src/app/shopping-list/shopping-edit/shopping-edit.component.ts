import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';


import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static:false}) slForm:NgForm;

  subscription:Subscription;
  editMode = false;
  editItemNumber :number;
  editItem : Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number) => {
        this.editItemNumber = index;
        this.editMode = true;
        this.editItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          'name':this.editItem.name,
          'amount':this.editItem.amount
        })
       }
    )
  }

  onItemSubmit(form:NgForm) {
     const value = form.value;
     const newIngredient = new Ingredient(value.name, value.amount);
     if(this.editMode){
        this.slService.updateIngredients(this.editItemNumber, newIngredient);
     } else {
       this.slService.addIngredient(newIngredient);
      }
      this.editMode = false;
      form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredients(this.editItemNumber);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
