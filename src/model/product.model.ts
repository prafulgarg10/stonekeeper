import { FileDTO } from "./list.model";

export class Product{
    id: number = 0;
    name: string = '';
    weight: number  = 0;
    quantity: number = 0;
    category: number = 0;
    material: number = 0;
    categoryName: string = '';
    materialName: string = '';
    productImage: FileDTO | null = null; 
    imageSrc: string = '';
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