import { Router } from "@angular/router";
import { IItemService } from "../Interfaces/IItemService";
import { ICategory } from "../Models/ICategory";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Urls } from "../Consts/Urls";
import { Injectable } from "@angular/core";
import { Observable, ObservedValueOf } from "rxjs";

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
    public GetItems(categories: (string|number)[]): Observable<HttpResponse<any>>{
        

        const params = new HttpParams();
        params.set("categoriesId", categories[0])
        // for(let category of categories){
        //     params.append("categoriesId", category)
        // }
        const options = {
            observe: "response",
            responseType: "json",
            params: params
        }
        return this.client.get(Urls.items, {
            observe: "response",
            responseType: "json",
            params: params
        })
    }
}