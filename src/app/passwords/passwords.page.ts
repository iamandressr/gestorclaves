import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.page.html',
  styleUrls: ['./passwords.page.scss'],
  standalone: false
})
export class PasswordsPage implements OnInit {
   clave = {
    account_name: '',
    username: '',
    password_encrypted: '',
    url: '',
    notes: ''
  };

  constructor(
    private api: ApiService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async guardar() {
    if (!this.clave.account_name || !this.clave.username || !this.clave.password_encrypted) {
      const toast = await this.toastCtrl.create({
        message: 'Completa todos los campos obligatorios',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    this.api.addPassword(this.clave).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Clave agregada correctamente',
          duration: 2000,
          position: 'top'
        });
        toast.present();
        this.modalCtrl.dismiss(true); // Cierra modal y retorna true para recargar lista
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Error al agregar la clave',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
