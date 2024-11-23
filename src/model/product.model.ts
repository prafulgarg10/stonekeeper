export class Product{
    Id: number = 0;
    Name: string = '';
    Weight: number|undefined;
    Quantity: number|undefined;
    Category: number = 0;
    Material: number = 0;
    Picture: string|undefined;
    Category_Name: string = '';
    Material_Name: string = '';
}

export class Category{
    Id: number = 0;
    Name: string = '';
    Purity: number|undefined;
    Active: boolean = true;
    Description: string|undefined;
}

export class Material{
    Id: number = 0;
    Name: string = '';
    PricePer10Gm: number = 0;
}