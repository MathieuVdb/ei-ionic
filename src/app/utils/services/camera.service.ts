import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserPhoto } from '../models/user-photo';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  photos: UserPhoto[] = []; 
  private KEY_GALLERY = 'ei-gallery';

  constructor(
    private storage: Storage,
    private platform: Platform
  ) { }

  async loadPhoto() {
    const strList = await this.storage.get(this.KEY_GALLERY); 
    this.photos = strList || []; 
    if(!this.platform.is('hybrid')) {
      for(const p of this.photos) {
        const {data} = await Filesystem.readFile({
          path : p.path,
          directory: Directory.Data
        });
        p.webPath = `data:image/jpeg;base64,${data}`;
      }
    }  
  }

  async takePicture() {
    const photo = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    });
    this.savePicture(photo);
    console.log(`Photo prise avec succes`);
  }
  
  async chooseInGallery() {
    const photo = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri
    });
    this.savePicture(photo);
    console.log(`Photo prise avec succes`);
  }

  async chooseImageSource() {
    const photo = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri
    });
    this.savePicture(photo);
    console.log(`Photo prise avec succes`);
  }

  async savePicture(photo : Photo)  {
    const base64 = await this.readAsBase64(photo);
    const path = Date.now() + '.jpeg';
    const saved = await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Data
    });

    let userPhoto: UserPhoto;
    if(this.platform.is('hybrid')) {
      userPhoto = {path: saved.uri, webPath: Capacitor.convertFileSrc(saved.uri)};
    } else {
      userPhoto = {path, webPath: photo.webPath};
    }
    this.photos.unshift(userPhoto);
    await this.storage.set(this.KEY_GALLERY, this.photos);
  }

  async readAsBase64(photo : Photo) {
    if(this.platform.is('hybrid')) {
      const {data} = await Filesystem.readFile({
        path: photo.path
      });
      return data;
    } 
    
    const responsePhoto = await fetch(photo.webPath);
    const blob = await responsePhoto.blob();
    return await this.blobToBase64(blob) as string;

  }

  blobToBase64(blob: Blob) {
    return new Promise((response, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => { response(reader.result) };
      reader.readAsDataURL(blob);
    });
  }

}
