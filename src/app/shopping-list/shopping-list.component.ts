import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsSubscription : Subscription;
  

  constructor(private slService: ShoppingListService,
            private router:Router) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();

    this.ingredientsSubscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }


  ngOnDestroy(){
    this.ingredientsSubscription.unsubscribe();
  }

  onEditItem(index:number){
    this.slService.startedEditing.next(index);
  }

}
