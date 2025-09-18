import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { Password } from '../models/password.model';
import { NavController } from '@ionic/angular';
import { PasswordsPage } from '../passwords/passwords.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  
  username: string = '';
  passwords: Password[] = [];

  showPassword: { [id: string]: boolean } = {};

  constructor(
    private authService: AuthService,
    private api: ApiService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

     ngOnInit() {
    this.username = this.authService.getUsername() || 'Usuario';
    this.loadPasswords();
  }

  loadPasswords() {
    this.api.getPasswords().subscribe({
      next: (data: Password[]) => {
        this.passwords = data;
        // Inicializar visibilidad en false
        data.forEach(pwd => this.showPassword[pwd.id!] = false);
      },
      error: (err) => {
        console.error(err);
        this.showToast('Error cargando claves');
      }
    });
  }

  togglePassword(id: string) {
    this.showPassword[id] = !this.showPassword[id];
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Seguro que quieres cerrar sesión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

   async deletePassword(id: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar contraseña',
      message: '¿Estás seguro de eliminar esta contraseña?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Eliminar', handler: () => {
            this.api.deletePassword(id).subscribe({
              next: () => {
                this.showToast('Contraseña eliminada');
                this.loadPasswords(); // recarga la lista
              },
              error: () => this.showToast('Error eliminando contraseña')
            });
          } 
        }
      ]
    });
    await alert.present();
  }

   async agregarClave() {
    const modal = await this.modalCtrl.create({
      component: PasswordsPage
    });

    await modal.present();

    // Capturar la data al cerrar el modal
    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('Nueva clave agregada:', data);
      // Aquí podrías guardar en BD o actualizar la lista en pantalla
    }
  }


  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
