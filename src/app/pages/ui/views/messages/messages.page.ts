import { Component, OnInit, TRANSLATIONS_FORMAT } from '@angular/core';
import { AlertController, AlertOptions, ToastController, ToastOptions } from '@ionic/angular';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { }
  
  async createToast(message = 'Coffee time', 
                    color: 'success'|'warning'|'danger' = 'warning') {
    const config: ToastOptions = {
      message,
      icon: 'warning-outline',
      color,
      position: 'top',
      duration: 5000
    };

    const toast = await this.toastController.create(config);
    toast.present();
  }

  async createAlert() {
    const config: AlertOptions = {
      header: 'Attention !',
      subHeader: 'Ceci est une information important',
      message: 'Il n\'y a plus de café !!',
      buttons: [
        {
          text: 'Paniquer',
          role: 'panic',
          cssClass: 'secondary',
          id: 'panic-button',
          handler: (() => {
            this.createToast('Aaaaaaaaaaaaaaaaaaaaaaaaah', 'danger');
          })
        }, 
        {
          text: 'Je vais en chercher',
          id: 'confirm-button',
          role: 'do-it',
          handler: (() => {
            this.createToast('Je vais en chercher, pas de panique', 'success');
          })
        }
      ]
    }
    const alert = await this.alertController.create(config);
    alert.present();
    

    const {role} = await alert.onDidDismiss();
    console.log('On did dismiss : ' + role);
  }

  async createPrompt() {
    const alert = await this.alertController.create({
      header: 'Are you ok ?',
      inputs: [
        {
          label: 'Oui',
          type:'radio',
          name:'ok',
          value:'yes',
          handler: () => {
            console.log('Yes selected');
          }
        },
        {
          label: 'Non',
          type:'radio',
          name:'ko',
          value:'no',
          handler: () => {
            console.log('No selected');
          }
        }
      ],
      buttons: ['Confirmed']
    });

    alert.present(); 
    const {data} = await alert.onDidDismiss();
    console.log(data);
    
  }

}
