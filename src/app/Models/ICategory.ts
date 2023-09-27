export interface ICategory{
    id: number
    name: string
    subCategories: Array<ICategory>
}