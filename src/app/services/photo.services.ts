import { Component } from "@angular/core";


export class photoServices{

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
}