import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController) { 
    
  }

  async createToast(message = 'Coffee time', 
                    color: 'success'|'warning'|'danger' = 'warning',
                    position: 'top' | 'bottom' | 'middle' = 'bottom') {
    const config: ToastOptions = {
      message,
      icon: 'warning-outline',
      color,
      position,
      duration: 5000
    };

    const toast = await this.toastController.create(config);
    toast.present();
  }

  
  async createConfirm(header, message, callback) {
    const config: AlertOptions = {
      header,
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button'
        }, 
        {
          text: 'Confirm',
          id: 'confirm-button',
          role: 'confirm',
          handler: callback
        }
      ]
    }
    const alert = await this.alertController.create(config);
    alert.present();
  }

}
