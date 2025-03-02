import { Component, EventEmitter, Output } from '@angular/core';
import { FileDTO } from '../../../model/list.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../Dialog/message-dialog/message-dialog.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatDialogModule, MessageDialogComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  @Output() fileUploaded: EventEmitter<FileDTO> = new EventEmitter<FileDTO>();
  supportedFileFormats: string[] = ['PNG', 'JPEG'];
  maxFileSize: number = 2; //Mb
  constructor(private dialog: MatDialog){

  }

  onFileBrowse(event: any){
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let fileDTO = new FileDTO();
      let fileType = file.name.split('.').pop().toUpperCase();
      if(!this.supportedFileFormats.includes(fileType)){
        this.fileUploaded.emit(undefined);
        event.target.value = "";
        this.openDialog("File format not supported. Kindly try again with appropriate file type.", 'Warning!');
        return;
      }
      if(file.size/1000000>=this.maxFileSize){
        this.fileUploaded.emit(undefined);
        event.target.value = "";
        this.openDialog("Maximum allowed Image size is " + this.maxFileSize + " Mb. Kindly try again with appropriate file size.", 'Warning!');
        return;
      }
      fileDTO.name = file.name;
      fileDTO.fileType = fileType;
      fileDTO.base64 = reader.result?.toString().split("base64,")[1];
      fileDTO.fileSize = file.size;
      this.fileUploaded.emit(fileDTO);
    };
  }

  openDialog(msg: string, title: string) {
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data:{
          message: msg,
          boxTitle: title
        }
      });
    }

}
