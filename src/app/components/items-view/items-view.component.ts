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
  ngOnInit(){
    combineLatest([this.route.paramMap, this.route.queryParamMap])
    .subscribe(([paramMap, queryParamMap]) =>{
      this.gender = <any>queryParamMap.get(QueryParams.gender)
      this.catType = <any>paramMap.get(QueryParams.catType)
      this.categoriesId = <any>queryParamMap.get(QueryParams.categories)

      this.itemService.GetItems(this.gender, this.categoriesId, this.catType)
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
      // const ul = element.nextElementSibling as HTMLElement
      // if(!ul.style.height || ul.style.height == '0px'){
      //   const count = ul.childElementCount
      //   const singleHeight = 30;
      //   ul.style.height = count * singleHeight + 'px';
      // }else{
      //   ul.style.height = '0px';
      // }
      
      e.target.classList.toggle("not-expand")
      e.target.classList.toggle("expand")
      element.classList.toggle("not-expand")
      element.classList.toggle("expand")
      
      
      // element.childNodes.forEach((c)=>{
      //   if(c instanceof Element){
      //     c.classList.toggle("not-expand")
      //     c.classList.toggle("expand");
      //   }
      // })
    }
  }
}
