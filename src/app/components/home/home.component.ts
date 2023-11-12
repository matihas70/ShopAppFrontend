import { Component, Input, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoriesTypes } from 'src/app/Consts/CategoriesTypes';
import { Genders } from 'src/app/Consts/Genders';
import { Paths } from 'src/app/Consts/Paths';
import { CatTypeEnum } from 'src/app/Enums/CatTypeEnum';
import { GenderEnum } from 'src/app/Enums/GendersEnum';
import { ICategory } from 'src/app/Models/ICategory';
import { ICategoryType } from 'src/app/Models/ICategoryType';
import { ItemService } from 'src/app/Services/ItemService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories!:ICategory[]
  @Input() isHover!:boolean
  private subCategories:any
  hoveredButton!:string

  constructor(private items: ItemService, private router: Router){
    this.subCategories = items.GetCategories()
    .subscribe(res=> 
      {
        this.categories = res.body
      })
  }
  buttonsTypes = [
    CategoriesTypes.New,
    CategoriesTypes.Male,
    CategoriesTypes.Female,
    CategoriesTypes.Kids,
    CategoriesTypes.Sales,
    CategoriesTypes.Special
  ]
  iconPaths = ["user.svg", "star.svg", "settings.svg", "cart.svg" ].map(x => Paths.icons + x)
  genders = [Genders.Male, Genders.Female, Genders.Kids]

  getCatTypeString(catType: CatTypeEnum): string{
    switch(catType){
      case CatTypeEnum.New:
        return CategoriesTypes.New.text;
      case CatTypeEnum.Sales:
        return CategoriesTypes.Sales.text;
      case CatTypeEnum.Special:
        return CategoriesTypes.Special.text;
    }
    return "";
  }

  showCategories(text:string){
    this.hoveredButton = text;
  }
  hideCategories(){
    this.hoveredButton = "New"
  }
}
