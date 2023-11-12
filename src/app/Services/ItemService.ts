import { Router } from "@angular/router";
import { IItemService } from "../Interfaces/IItemService";
import { ICategory } from "../Models/ICategory";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Urls } from "../Consts/Urls";
import { Injectable } from "@angular/core";
import { Observable, ObservedValueOf } from "rxjs";
import { GenderEnum } from "../Enums/GendersEnum";
import { CatTypeEnum } from "../Enums/CatTypeEnum";
import { QueryParams } from "../Consts/QueryParams";

@Injectable({providedIn: "root"})
export class ItemService {

    constructor(private client: HttpClient, private router: Router){

    }

    public GetCategories(): Observable<HttpResponse<any>> {
        
        let categories:ICategory[] = []
        return this.client.get(Urls.categories, {observe:"response", responseType: "json"})
        // .subscribe((res:HttpResponse<any>) => {
        //     categories = res.body
        // })

        //return categories;
    }
    public GetItems(gender?: GenderEnum, categories?: (string|number)[], catType?: CatTypeEnum): Observable<HttpResponse<any>>{
        

        let params = new HttpParams();

        if(categories)
        for(let category of categories){
            params = params.append(QueryParams.categories, category)
        }

        if(gender)
        params = params.append(QueryParams.gender, gender)
        const options = {
            observe: "response",
            responseType: "json",
            params: params
        }
        let url = Urls.items
        if(catType){
            url = url + `/${catType}`
        }

        return this.client.get(url, {
            observe: "response",
            responseType: "json",
            params: params
        })
    }
    private getTypeParam(catTypeEnum: CatTypeEnum): string{
        switch(catTypeEnum){
            case CatTypeEnum.New:
                return QueryParams.new
            case CatTypeEnum.Sales:
                return QueryParams.sales
            case CatTypeEnum.Special:
                return QueryParams.special
        }
        return ""
    }
}