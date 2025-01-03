import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonText, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonToggle, IonInput, IonTextarea} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular'; // Importar NavController
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
  standalone: true,
  imports: [IonText, FormsModule ,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonToggle, IonInput, IonTextarea]
})
export class RegistroUsuarioPage {
   user = {
    name: '',
    email: '',
    phone: '',
    password: '',
  };

  constructor(private navCtrl: NavController, private storageServices: StorageService) {}

  onSubmit() {
    // console.log('Datos del usuario:', this.user);
    // alert('Usuario registrado correctamente');
    // this.navCtrl.navigateBack('/login');
  }

  inicio(){
    this.navCtrl.navigateBack('/login');
  }

  async registerUser() {
    await this.storageServices.registerUser(this.user.email, this.user.password, this.user.name, this.user.phone);
    alert('Usuario registrado correctamente');
    this.navCtrl.navigateBack('/login');
  }
}

