import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonLabel, IonItem, IonListHeader, IonButton, IonInput,IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Geolocation } from '@capacitor/geolocation';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonList, IonLabel, IonItem, IonListHeader, IonButton, IonInput ,IonHeader, IonToolbar, IonTitle, IonContent]
})

export class LoginPage {
  email: string = '';
  password: string = '';



  constructor(private router: Router, private storageServices: StorageService) {}

    async ngOnInit() {
    await this.requestPermissions();
  }

  async requestPermissions() {
  try {
    // Verificar y solicitar permiso para la cámara
    const cameraStatus = await Camera.checkPermissions();
    if (cameraStatus.camera !== 'granted') {
      const cameraPermission = await Camera.requestPermissions();
      if (cameraPermission.camera !== 'granted') {
        alert('Es necesario conceder permisos de cámara para usar esta función.');
        return; // Salir si el usuario no concede el permiso
      }
    }

    // Verificar y solicitar permiso para el almacenamiento
    const storageStatus = await Filesystem.checkPermissions();
    if (storageStatus.publicStorage !== 'granted') {
      const storagePermission = await Filesystem.requestPermissions();
      if (storagePermission.publicStorage !== 'granted') {
        alert('Es necesario conceder permisos de almacenamiento para usar esta función.');
        return; // Salir si el usuario no concede el permiso
      }
    }

    // Verificar y solicitar permiso para la geolocalización
    const locationStatus = await Geolocation.checkPermissions();
    if (locationStatus.location !== 'granted') {
      const locationPermission = await Geolocation.requestPermissions();
      if (locationPermission.location !== 'granted') {
        alert('Es necesario conceder permisos de geolocalización para usar esta función.');
        return; // Salir si el usuario no concede el permiso
      }
    }

    console.log('Todos los permisos han sido concedidos.');
  } catch (error) {
    console.error('Error al solicitar permisos:', error);
    alert('Hubo un error al solicitar permisos. Intenta nuevamente.');
  }
}




  login() {

    // Validar que ambos campos no estén vacíos
    if (!this.email || !this.password) {
      alert('Por favor, completa todos los campos');
      return; // Salir de la función si falta algún campo
    }

    if (true) {
      this.storageServices.loginUser(this.email, this.password).then((res) => {
        if (res) {
          this.router.navigate(['/listar-tareas']);
        }
        else {
          alert('Usuario o contraseña incorrectos');
        }
      });
    }
  }

  register(){
    this.router.navigate(['/registro-usuario']);
  }
}
