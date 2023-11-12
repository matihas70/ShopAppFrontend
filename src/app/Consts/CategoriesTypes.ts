import { CatTypeEnum } from "../Enums/CatTypeEnum";
import { ICategoryType } from "../Models/ICategoryType";

export class CategoriesTypes{
    public static New: ICategoryType ={
        text: "New",
        catTypeEnum: CatTypeEnum.New,
        isGender: false
    }
    public static Sales: ICategoryType ={
        text: "Sales",
        catTypeEnum: CatTypeEnum.Sales,
        isGender: false
    }
    public static Special: ICategoryType ={
        text: "Special",
        catTypeEnum: CatTypeEnum.Special,
        isGender: false
    }
    public static Male: ICategoryType ={
        text: "Man",
        catTypeEnum: CatTypeEnum.Male,
        isGender: true
    }
    public static Female: ICategoryType ={
        text: "Woman",
        catTypeEnum: CatTypeEnum.Female,
        isGender: true
    }
    public static Kids: ICategoryType ={
        text: "Kids",
        catTypeEnum: CatTypeEnum.Kids,
        isGender: true
    }
}