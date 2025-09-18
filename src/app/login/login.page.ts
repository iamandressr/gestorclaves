import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private toastController: ToastController
  ) { }

  async login() {
    if (!this.username || !this.password) {
      this.showToast('Por favor ingresa usuario y contraseña');
      return;
    }

    this.api.login(this.username, this.password).subscribe({
  next: (res: any) => {
    // Guardar token y username
    localStorage.setItem('token', res.token);
    localStorage.setItem('username', this.username);  // <-- esto

    // Redirigir a Home
    this.router.navigate(['/home']);
  },
  error: (err) => {
    console.error(err);
    this.showToast('Credenciales incorrectas');
  }
});
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
