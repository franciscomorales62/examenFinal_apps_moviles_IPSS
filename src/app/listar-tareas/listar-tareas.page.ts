import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonAvatar, IonHeader, IonTitle, IonToolbar, IonItem, IonThumbnail,IonButton, IonIcon, IonLabel, IonList, IonButtons, IonModal, IonCardHeader, IonCardTitle, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { NavController, ModalController } from '@ionic/angular'; 
import { TareaService } from 'src\\app\\services\\tarea.services'
import { StorageService } from 'src\\app\\services\\storage.service'
import { TareasLocal } from 'src\\app\\services\\storage.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.page.html',
  styleUrls: ['./listar-tareas.page.scss'], 
  standalone: true,
  imports: [IonContent, IonAvatar, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonThumbnail,IonButton, IonIcon, IonLabel, IonList, IonButtons, IonModal, IonCardHeader, IonCardTitle, IonCardContent, IonCard]
})
export class ListarTareasPage implements OnInit {

  tareas: TareasLocal[] = [];

  constructor(
    private navCtrl: NavController,   // Inyecta NavController
    private tareaService: TareaService,
    private storageService: StorageService, // Inyecta StorageService (base de datos local)
    
  ) {}

    ngOnInit() {
    this.refreshTareas();
  }

  // Método para refrescar la lista de tareas
  refreshTareas() {
    this.tareaService.getTareas().subscribe(async (data: any) => {
      if (data && data.length > 0) {
        const tareasLocal: TareasLocal[] = data.map((tarea: any) => ({
          id: tarea.id,
          image: tarea.image,
          title: tarea.title,
          description: tarea.description,
          completed: tarea.completed,
          latitude: tarea.latitude,
          longitude: tarea.longitude,
          // Mapea más propiedades según sea necesario
        }));
        await this.storageService.saveTareas(tareasLocal);
        this.tareas = tareasLocal;
      } else {
        this.storageService.getTareas().subscribe((storedData: TareasLocal[]) => {
          this.tareas = storedData;
        });
      }
    });
  }

  // Método para ir a la página de crear tarea (lista-tareas)
  irACrearTarea() {
    this.navCtrl.navigateForward('/lista-tareas');
  }

  // Método para ir a la página de editar tarea (editar-tarea)
  irAEditarTarea(id: string) {
    this.navCtrl.navigateForward(`/editar-tarea/${id}`); 
  }

  // Método para eliminar tarea
  eliminarTarea(id: string) {
    this.tareaService.eliminarTarea(id).subscribe(() => {
      this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    });
  }

  // Método para cerrar sesión
  cerrarSesion() {
    this.navCtrl.navigateRoot('/login');
  }


 

  
  
}
