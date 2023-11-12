import { GenderEnum } from "../Enums/GendersEnum";
import { IGender } from "../Models/IGender";

export class Genders{
    public static Male: IGender = {
        text: 'Man',
        enum: GenderEnum.Male
    }
    public static Female: IGender = {
        text: 'Woman',
        enum: GenderEnum.Female
    }
    public static Unisex: IGender = {
        text: 'Unisex',
        enum: GenderEnum.Unisex
    }
    public static Kids: IGender = {
        text: 'Kids',
        enum: GenderEnum.Kids
    }
    public static GendersArray = [Genders.Male, Genders.Female, Genders.Unisex, Genders.Kids]
}