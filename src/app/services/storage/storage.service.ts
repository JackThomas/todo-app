import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageItem } from 'src/app/interfaces/storageItem';
import { environment } from 'src/environments/environment';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   * store
   */
  public async store(key: string, value: any) {
    const data: StorageItem = {
      data: value,
      created: new Date(),
    };

    const encryptedValue = this.encrypt(JSON.stringify(data));

    return await Storage.set({
      key,
      value: encryptedValue,
    });
  }

  /**
   * get
   */
  public async get(key: string) {
    const response = await Storage.get({ key });
    if (response.value !== null) {
      return JSON.parse(this.decrypt(response.value));
    }
    return false;
  }

  /**
   * getObservable
   * Returns strorage data item as an observable object
   */
  public getObservable(key: string): Observable<any> {
    return from(Storage.get({ key })).pipe(
      map((response: any) => {
        if (response.value !== null) {
          return JSON.parse(unescape(atob(response.value)));
        }
        return response.value;
      })
    );
  }

  /**
   * remove
   */
  public async remove(key: string) {
    return await Storage.remove({ key });
  }

  /**
   * clear
   */
  public async clear() {
    await Storage.clear();
  }

  /**
   * encrypt
   */
  public encrypt(data: any) {
    return environment.encrypt ? btoa(escape(data)) : data;
  }

  /**
   * decrypt
   */
  public decrypt(data) {
    return environment.encrypt ? unescape(atob(data)) : data;
  }
}
