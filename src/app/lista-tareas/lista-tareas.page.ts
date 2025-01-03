import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonToggle, IonInput, IonTextarea, IonRow, IonCol, IonGrid} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.page.html',
  styleUrls: ['./lista-tareas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonButton, IonToggle,IonInput, IonTextarea, IonRow, IonCol, IonGrid]
})
export class ListaTareasPage {
  task = {
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    image: 'https://es.wikipedia.org/static/images/icons/wikipedia.png',
    completed: false,
  };

  private apiUrl = 'https://67482d2f5801f515358faa6c.mockapi.io/v1/task/task';

  constructor(private navCtrl: NavController, private http: HttpClient) {}

  async sendTask(event: Event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario.

    try {
      const response = await firstValueFrom(this.http.post(this.apiUrl, this.task));
      console.log('Tarea enviada:', response);
      alert('Tarea enviada correctamente');

      // Limpia el formulario
      this.task = {
        title: '',
        description: '',
        latitude: '',
        longitude: '',
        image: 'https://es.wikipedia.org/static/images/icons/wikipedia.png',
        completed: false,
      };

      // Navegar a la página anterior
      this.navCtrl.navigateBack('/listar-tareas');

    } catch (error) {
      console.error('Error al enviar la tarea:', error);
      alert('Error al enviar la tarea');
      // Navegar a la página anterior
      this.navCtrl.navigateBack('/listar-tareas');
    }
  }

  volver() {
    this.navCtrl.navigateBack('/listar-tareas');
  }
  
  // uso de la camara
   foto: string | null = null;

  abrirCamara() {
    const input = document.getElementById('file-input') as HTMLInputElement;
    if (input) {
      input.click(); // Simula el clic en el input para abrir la cámara
    }
  }

  mostrarFoto(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.foto = e.target?.result as string; // Asigna la imagen al atributo foto
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // uso de geolocalización
  latitud: number | null = null;
  longitud: number | null = null;

  async obtenerUbicacion() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;

      //rellenar formulario con la ubicacion
      this.task.latitude = this.latitud.toString();
      this.task.longitude = this.longitud.toString();
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      alert('No se pudo obtener la ubicación. Por favor, verifica los permisos.');
    }
  }
}