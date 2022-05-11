import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/utils/services/file.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {

  file: string;
  files: string[];
  text: string;
  message: string;

  constructor(
    private fileService:FileService
  ) { }

  ngOnInit() {
    this.readAll();
  }

  write() {
    if(this.text.trim()) {
      this.fileService.write(this.text, this.file).then(() => {
        this.text = "";
        this.readAll();
      });
    }
  }
  
  append() {
    if(this.files.includes(this.file) && this.text.trim()) {
      this.fileService.append(this.text, this.file).then(() => {
        this.text = "";
        this.read();
      });
    }
  }

  async read() {
    this.message = "";
    const {data} = await this.fileService.read(this.file);
    this.message = data;
  }
  
  delete() { 
    this.fileService.delete(this.file).then(() => {
      this.message = "";
      this.file = "";
      this.readAll();
    }); 
  }

  async readAll() {
    const {files} = await this.fileService.getAll(); 
    this.files = files;
    console.log(files);
  }

  changeFile(f) {
    this.file = f;
    this.read();
  }

}
