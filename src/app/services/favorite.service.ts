import { Injectable } from '@angular/core';

import { Dish } from '../../shared/dish';
import { DishService } from './dish.service';


import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { catchError, map, delay } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;

  constructor(public http: Http,
    private dishService: DishService,
    private storage: Storage) {
    
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
