import { Injectable } from '@angular/core';

import { Dish } from '../../shared/dish';
import { DishService } from './dish.service';


import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { catchError, map, delay } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;

  constructor(public http: Http,
    private dishService: DishService,
    private storage: Storage,
    private localNotifications: LocalNotifications) {
    
    this.storage.get('favorites').then(favorites => {
      if (favorites) {
        this.favorites = favorites;
      } else {
        this.favorites = [];
      }
    });
  }

  addFavorite(id: number): boolean {
   
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites);
      this.localNotifications.schedule({
        id:id,
        text: 'Dish ' + id + ' added as a favorite successfully'
      })
    }
    else
      return false;
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishService.getDishes().pipe(
      map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)))
    );
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
        this.favorites.splice(index, 1);
        this.storage.set('favorites', this.favorites);
        return this.getFavorites();
    } else {
        console.log('Deleting non-existant item', id);
        return Observable.throw('Deleting non-existant item' + id);
    }
  }
}
