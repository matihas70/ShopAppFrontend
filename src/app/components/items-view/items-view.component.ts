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
  categories!: ICategory[]
  constructor(private itemService: ItemService, private route: ActivatedRoute) {

  }
  filters!: { categories: string[], gender: GenderEnum, catType: CatTypeEnum }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      console.log(params)
    })
    combineLatest([this.route.params, this.route.queryParams])
      .subscribe(([params, queryParams]) => {
        const categories = queryParams[QueryParams.categories]
        console.log(params, queryParams);
        this.filters = {
          categories: typeof categories === 'string' ? [categories] : categories,
          gender: <GenderEnum>queryParams[QueryParams.gender],
          catType: <any>params[QueryParams.catType]
        }

        this.itemService.GetItems(this.filters.gender, this.filters.categories, this.filters.catType)
          .subscribe(res => {

          })
      })

    this.itemService.GetCategories()
      .subscribe(res => {
        this.categories = res.body
        console.log(this.categories)
      })

  }
  getGenders() {
    return Genders.GendersArray;
  }

  arrowPath = Paths.icons + 'arrow-down.svg'
  expand(e: Event) {
    e.stopPropagation()
    if (e.target instanceof HTMLElement) {

      let element = e.target.parentElement as HTMLElement

      if (element.nodeName == 'SPAN' && element.parentElement) {
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
  checkCategory(category: ICategory) {
    // const isParent = category.parentCategoryId? this.filters.categories.indexOf(category.parentCategoryId.toString()) != -1 : false
    // const areChildren = category.subCategories? category.subCategories.every(sc => this.filters.categories.indexOf(sc.id.toString())) : false
    const isCategory = this.filters.categories.some(x => x == category.id.toString())
    return isCategory//||isParent||areChildren;
  }
  choseCategory(e: Event, category: ICategory) {
    if (this.filters.categories.some(x => x == category.id.toString())) {
      this.filters.categories.splice(this.filters.categories.findIndex(x => x == category.id.toString()), 1)
      this.unchoseParent(category);
      this.unchoseChildren(category);

    } else {
      console.log(category)
      this.filters.categories.push(category.id.toString());
      this.choseChildren(category);
      this.choseParent(category);
    }
    //element.classList.toggle('chosen')
  }
  choseParent(category: ICategory){
    if(category.parentCategoryId != 0){
      const parent = this.findCategory(category.parentCategoryId);
      if(parent?.subCategories.every(s => this.filters.categories.some(c => c == s.id.toString()))){
        this.filters.categories.push(parent.id.toString());
        this.choseParent(parent);
      }
    }
  }
  unchoseParent(category: ICategory) {
    if (category.parentCategoryId != 0) {
      const parent = <ICategory>this.findCategory(category.parentCategoryId);
      if (parent) {
        this.filters.categories.splice(this.filters.categories.findIndex(x => x == parent.id.toString()), 1)
        this.unchoseParent(parent)
      }
    }
  }
  findCategory(categoryId: number, categories: ICategory[] = this.categories): ICategory | undefined {
    const found = categories.find(c => c.id == categoryId)
    if(found){
      return found
    }
    for(var c of categories){
      if(!c.subCategories){
        continue;
      }
      const found2 = this.findCategory(categoryId, c.subCategories)
      if(found2)
        return found2;
    }
    return
  }
  unchoseChildren(category: ICategory) {
    if (this.filters.categories.findIndex(x => x == category.id.toString()) != -1)
      this.filters.categories.splice(this.filters.categories.findIndex(x => x == category.id.toString()), 1)
    if (category.subCategories)
      category.subCategories.forEach((c) => {
        if (this.filters.categories.findIndex(x => x == c.id.toString()) != -1) {
          this.filters.categories.splice(this.filters.categories.findIndex(x => x == c.id.toString()), 1)
        }

        this.unchoseChildren(c);
      })
  }

  choseChildren(category: ICategory) {
    if (this.filters.categories.findIndex(x => x == category.id.toString()) == -1)
      this.filters.categories.push(category.id.toString())
    if (category.subCategories)
      category.subCategories.forEach((c) => {
        if (this.filters.categories.findIndex(x => x == c.id.toString()) == -1) {
          this.filters.categories.push(c.id.toString())
        }

        this.choseChildren(c);
      })
  }
}
