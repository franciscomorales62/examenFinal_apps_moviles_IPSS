import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonToggle, IonInput, IonTextarea} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TareaService } from 'src\\app\\services\\tarea.services'


@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.page.html',
  styleUrls: ['./editar-tarea.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButton, IonToggle, IonInput, IonTextarea]
})
export class EditarTareaPage implements OnInit {
  tarea: any = {
    image: '',
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    completed: false,
  };

  constructor(
    private route: ActivatedRoute,
    private tareaService: TareaService,
    // public navCtrl: NavController
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tareaService.obtenerTarea(id).then((data: any) => {
        this.tarea = data; // Rellenar el formulario con los datos de la tarea
      });
    }
  }

  guardarCambios() {
    this.tareaService.editarTarea(this.tarea.id, this.tarea).then(() => {
      window.location.reload();
      this.router.navigate(['/listar-tareas']);
        // Volver a la lista de tareas
    });
  }

  cancelar() {
    this.router.navigate(['/listar-tareas']); // Cancelar y volver a la lista de tareas
  }
}