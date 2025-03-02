import { FileDTO } from "./list.model";

export class Product{
    id: number = 0;
    name: string = '';
    weight: number|undefined;
    quantity: number|undefined;
    category: number = 0;
    material: number = 0;
    picture: string|undefined;
    categoryName: string = '';
    materialName: string = '';
    productImage: FileDTO | undefined; 
    imageSrc: string | undefined;
}

export class Category{
    id: number = 0;
    name: string = '';
    purity: number|undefined;
    active: boolean = true;
    description: string|undefined;
}

export class Material{
    id: number = 0;
    name: string = '';
    pricePer10Gm: number = 0;
}