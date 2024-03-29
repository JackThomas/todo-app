import { Injectable } from '@angular/core';
import { StorageService } from './../storage/storage.service';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageItem } from 'src/app/interfaces/storageItem';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private storage: StorageService) {}

  /**
   * get
   *
   * @param url the route of the resources needed
   *
   * @returns Observable<any>
   */
  public async get(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  /**
   * getObservable
   *
   * @param url the route of the resources needed
   *
   * @returns Observable<any>
   */
  public getObservable(key: string): Observable<any> {
    return from(this.storage.getObservable(key)).pipe(
      map((response: StorageItem) => {
        return response;
      }),
      catchError(this.errorHandler)
    );
  }

  /**
   * save
   *
   * @param key
   * @param data
   *
   * @returns Promise<void>
   */
  public async save(key: string, data: any): Promise<void> {
    return await this.storage.store(key, data);
  }

  /**
   * errorHandler
   *
   * @param response
   *
   * @throws Server error
   */
  private errorHandler(response: any) {
    switch (response.status) {
      default:
        return throwError('Data not found');
        break;
    }
  }
}
