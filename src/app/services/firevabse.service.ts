import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, push, update, remove } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FirevabseService {

  constructor() { }

  private app = initializeApp(environment.firebase);
  private db = getDatabase(this.app);

  writeData(path: string, data: any) {
    const primaryKey = ref(this.db, path);
    const newMaterialRef = push(primaryKey);
    return set(newMaterialRef, data);
  }

  pushData(path: string, data: any) {
    const newRef = push(ref(this.db, path));
    return set(newRef, data);
  }

  listenData(path: string, callback: (val: any) => void) {
    onValue(ref(this.db, path), (snapshot) => {
      callback(snapshot.val());
    });
  }

  updateData(path: string, data: any) {
    return update(ref(this.db, path), data);
  }

  deleteData(path: string) {
    return remove(ref(this.db, path));
  }
}
