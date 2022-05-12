import { Component, OnInit } from '@angular/core';
import { UserPhoto } from 'src/app/utils/models/user-photo';
import { CameraService } from 'src/app/utils/services/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  photos: UserPhoto[] = [];

  constructor(
    private cameraService: CameraService
  ) { }

  ngOnInit() {
    this.cameraService.loadPhoto().then(() => this.photos = this.cameraService.photos);
  }

  loadPictures() {
    this.photos = this.cameraService.photos;
  }

  takePicture() {
    this.cameraService.takePicture()
      .then(() => this.loadPictures());
  }

  chooseInGallery() {
    this.cameraService.chooseInGallery()
    .then(() => this.loadPictures());
  }

  chooseImageSource() {
    this.cameraService.chooseImageSource()
    .then(() => this.loadPictures());
  }

}
