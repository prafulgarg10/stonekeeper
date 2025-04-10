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
    isAddedToCart: boolean = false;
}

export class ProductInCart{
    product: Product = new Product();
    amount: number = 0 ;
    updatedWeight: number  = 0;
    updatedQuantity: number = 0;
    purity: number = 100;
    sellingPurity: number = 100;
}

export class Category{
    id: number = 0;
    name: string = '';
    purity: number = 100;
    sellingpurity: number = 100;
    active: boolean = true;
    description: string = '';
}

export class Material{
    id: number = 0;
    name: string = '';
    pricePer10Gm: number = 0;
}

export class Price{
    materialName: string = '';
    materialId: number = 0;
    price: number = 0;
    lastUpdated: Date | string = '';
}