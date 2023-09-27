import { Injectable } from "@angular/core";
import { ICategory } from "../Models/ICategory";
import { ICredentials } from "../Models/ICredentials";

export interface IItemService{
    GetCategories() : Array<ICategory>;
}