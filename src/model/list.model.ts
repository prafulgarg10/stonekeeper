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