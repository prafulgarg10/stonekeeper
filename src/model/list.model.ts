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