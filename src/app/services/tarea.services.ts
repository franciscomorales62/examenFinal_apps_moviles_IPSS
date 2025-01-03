import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl = 'https://67482d2f5801f515358faa6c.mockapi.io/v1/task/task';  // Reemplaza esto con tu URL

  constructor(private http: HttpClient) { }

  getTareas(): Observable<any> {
   return this.http.get(this.apiUrl);
  }

  eliminarTarea(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  obtenerTarea(id: string) {
  return fetch(`https://67482d2f5801f515358faa6c.mockapi.io/v1/task/task/${id}`).then((response) =>
    response.json()
  );
}

editarTarea(id: string, tarea: any) {
  return fetch(`https://67482d2f5801f515358faa6c.mockapi.io/v1/task/task/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tarea),
  });
}

}
