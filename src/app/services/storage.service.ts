import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as bcrypt from 'bcryptjs';
import { Observable, of, from } from 'rxjs'

export interface Usuario {
  
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface TareasLocal {
  // Define aquí las propiedades de la interfaz según los datos de las tareas
  id: string,
    image: string,
    title: string,
    description: string,
    latitude: string,
    longitude: string,
    completed: boolean,

}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  private readonly TAREAS_KEY = 'tareas';


  constructor(private storage: Storage) { 

    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async get(key: string) {
    const value = await this._storage?.get(key);
    console.log("getting key: ", key, " value: ", value);
    return await this._storage?.get(key);
  } 

  public async isEmpty():Promise<boolean> {
    const keys = await this._storage?.keys();
    return keys?.length === 0;
  }

  // registro de usuarios
  public async registerUser(email: string, password: string, name: string, phone: string) {
    const hashPass = await bcrypt.hash(password, 10);
    const user:Usuario = {email, password:hashPass, name, phone};
    const users = await this.get('usuarios') || [];
    users.push(user);
    await this.set('usuarios', users);
  }

  public async loginUser(email: string, password: string) {
    const users = await this.get('usuarios') || [];
    const user = users.find((u: Usuario) => u.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
      return true;
    }
    else {
      return false;
    }
  }

  // Guardar tareas en Ionic Storage
  public async saveTareas(tareas: TareasLocal[]): Promise<void> {
    await this.set(this.TAREAS_KEY, tareas);
  }

  // Obtener tareas desde Ionic Storage
  public getTareas(): Observable<TareasLocal[]> {
    return from(this.get(this.TAREAS_KEY).then(tareas => tareas || []));
  }
}
