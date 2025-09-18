import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from './../../services/api.service';
import { Password } from '../../models/password.model';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss']
})
export class PasswordModalComponent {
  @Input() password!: Password;

  constructor(
    private modalCtrl: ModalController,
    private api: ApiService,
    private toastCtrl: ToastController
  ) {}

  async save() {
    this.api.updatePassword(this.password.id!, this.password).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Contraseña actualizada',
          duration: 2000,
          position: 'top'
        });
        toast.present();
        this.modalCtrl.dismiss(true);
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Error actualizando contraseña',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
