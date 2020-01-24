import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription:Subscription;
  lastAddedRecipe = '';
  constructor(private recipeService: RecipeService, private router:ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipeWasChanged.subscribe(
      (recipe:Recipe[]) => {
        this.recipes = recipe;
      }
    );

    //check last edit and active
    this.subscription = this.router.fragment.subscribe(
      data => {
        if(data){ this.lastAddedRecipe = data; } 
        else { this.lastAddedRecipe = ''; }
       }
      )

    this.recipes = this.recipeService.getRecipes();
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
