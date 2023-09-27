import { Component, Input, Output } from '@angular/core';
import { Paths } from 'src/app/Consts/Paths';
import { ICategory } from 'src/app/Models/ICategory';
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

  constructor(private items: ItemService){
    this.subCategories = items.GetCategories()
    .subscribe(res=> 
      {
        this.categories = res.body
      })
  }
  buttonsTexts = ["New", "Man", "Woman", "Kids", "Sales", "Special"]
  iconPaths = ["user.svg", "star.svg", "settings.svg", "cart.svg" ].map(x => Paths.icons + x)

  onClickCategory(categoryId: string|number){
    this.items.GetItems([categoryId])
    .subscribe(res=>{

    })

  }

  showCategories(text:string){
    this.hoveredButton = text;
  }
  hideCategories(){
    this.hoveredButton = "New"
  }
}
