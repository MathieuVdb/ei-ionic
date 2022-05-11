import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem, PermissionStatus } from '@capacitor/filesystem';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class FileService { 

  constructor(
    private messageService: MessageService
  ) { }

  async requestPermission() {
    const permission: PermissionStatus = await Filesystem.checkPermissions();
    if(permission.publicStorage !== "granted") {
      try {
        await Filesystem.requestPermissions();
      } catch(e) {
        console.error(e);
        await this.messageService.createToast(`Impossible d'accéder au dossier`, 'danger', 'bottom');
      }
    }
  }

  async write(text: string, file: string) {
    if(!file.includes('.txt')) { file += '.txt'; }

    try {
      await Filesystem.writeFile({
        data: text,
        path: file,
        directory: Directory.External,
        encoding: Encoding.UTF8
      });
      await this.messageService.createToast(`Fichier créé`, 'success', 'top');
    } catch(e) {
      console.error(e);
      await this.messageService.createToast(`Impossible de créer le fichier`, 'danger', 'bottom');
    }
  }

  async append(text: string, file: string) {
    try {
      await Filesystem.appendFile({
        data: `\n${text}`,
        path: file,
        directory: Directory.External,
        encoding: Encoding.UTF8
      });
      await this.messageService.createToast(`Fichier modifié`, 'success', 'top');
    } catch(e) {
      console.error(e);
      await this.messageService.createToast(`Impossible de modifer le fichier`, 'danger', 'bottom');
    }
  }

  async read(file: string) {
    try {
      return await Filesystem.readFile({
        path: file,
        directory: Directory.External,
        encoding: Encoding.UTF8
      })
    } catch(e) {
      console.error(e);
      await this.messageService.createToast(`Impossible de récupérer le fichier`, 'danger', 'bottom');
    }
  }

  async delete(file: string) {
    try {
      await Filesystem.deleteFile({
          path: file,
          directory: Directory.External
      });
      await this.messageService.createToast(`Fichier supprimé`, 'success', 'top');
    } catch(e) {
      console.error(e);
      await this.messageService.createToast(`Impossible de supprimer le fichier`, 'danger', 'bottom');
    }
  }

  async getAll() {
    try {
      const res = await Filesystem.readdir({
        directory: Directory.External,
        path: ''
      })
      console.log(res);
      return res;
    } catch(e) {
      console.error(e);
      await this.messageService.createToast(`Impossible de lire le répertoire`, 'danger', 'bottom');
    }
  } 

}
