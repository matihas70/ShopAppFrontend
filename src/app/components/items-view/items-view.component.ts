import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, every } from 'rxjs';
import { Genders } from 'src/app/Consts/Genders';
import { Paths } from 'src/app/Consts/Paths';
import { QueryParams } from 'src/app/Consts/QueryParams';
import { CatTypeEnum } from 'src/app/Enums/CatTypeEnum';
import { GenderEnum } from 'src/app/Enums/GendersEnum';
import { ICategory } from 'src/app/Models/ICategory';
import { ItemService } from 'src/app/Services/ItemService';

@Component({
  selector: 'app-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.css']
})
export class ItemsViewComponent implements OnInit {
  gender!: GenderEnum
  categoriesId!: number[]
  catType!: CatTypeEnum
  categories!: ICategory
  constructor(private itemService: ItemService, private route: ActivatedRoute){
    
  }
  filters!: {categories: string[], gender: GenderEnum, catType: CatTypeEnum }

  ngOnInit(){

    this.route.queryParams.subscribe(params =>{
      console.log(params)
    })
    combineLatest([this.route.params, this.route.queryParams])
    .subscribe(([params, queryParams]) =>{
      const categories = queryParams[QueryParams.categories]
      console.log(params, queryParams);
      this.filters ={
        categories: typeof categories === 'string'? [categories] : categories,
        gender: <GenderEnum>queryParams[QueryParams.gender],
        catType: <any>params[QueryParams.catType]
      }
     
      this.itemService.GetItems(this.filters.gender, this.filters.categories, this.filters.catType)
      .subscribe(res=>{

      })
    })

    this.itemService.GetCategories()
    .subscribe(res=>{
      this.categories = res.body
      console.log(this.categories)
    })

  }
  getGenders(){
    return Genders.GendersArray;
  }
  checkCategory(catId: string){
    
    return this.filters.categories.some(x =>x == catId)
  }
  arrowPath = Paths.icons + 'arrow-down.svg'
  expand(e:Event){
    e.stopPropagation()
    if (e.target instanceof HTMLElement){
      
      let element = e.target.parentElement as HTMLElement
      
      if(element.nodeName == 'SPAN' && element.parentElement){
        element = element.parentElement
        console.log(element);
      }
      element = element.nextElementSibling as HTMLElement
      console.log(element);
      
      e.target.classList.toggle("not-expand")
      e.target.classList.toggle("expand")
      element.classList.toggle("not-expand")
      element.classList.toggle("expand")
    }
  }
  
  choseCategory(e:Event, categoryId:string){
    console.log(e.target);
    const element = e.target as HTMLElement
    if(this.filters.categories.some(x => x==categoryId)){
      this.filters.categories.splice(this.filters.categories.findIndex(x => x == categoryId), 1)
    }else{
      this.filters.categories.push(categoryId);
    }
    //element.classList.toggle('chosen')
  }
}
