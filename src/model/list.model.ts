export class MenuItems{
    name: string = '';
    id: number = 0;
    isActive: boolean = false;
}

export class FileDTO{
    name: string = '';
    fileType: string = '';
    fileSize: string = '';
    base64: string | undefined;
}

export class Login{
    Username: string = 'None';
    Password: string | undefined;
}

export class LoginResponse{
    token: string | undefined;
    expiration: Date | undefined;
}

export class RegisterResponse{
    message: string | undefined;
    status: string | undefined;
}

export class Register{
    Username: string | undefined;
    Password: string | undefined;
    Email: string | undefined;
}

export class Order{
    productId: number = 0;
    weight: number = 0;
    quantity: number = 0;
    price: number = 0;
}

export class UserOrders{
    orderId: number=0;
    totalAmount: number=0;
    createBy: string = '';
    createdOn: Date|string = '';
    products: ProductPerOrder[]|null = null;
    isDateUpdated: boolean = false;
}

export class ProductPerOrder{
    productImage: FileDTO|null = null;
    name: string = "";
    weight: number = 0;
    category: string = "";
    purity: number = 0;
    quantity: number = 0;
    materialPrice: number = 0;
    productTotal: number = 0;
    imageSrc: string = '';
}