import { Component, OnInit, Inject } from '@angular/core';
import { FavoriteService } from '../../app/services/favorite.service';
import { Dish } from '../../shared/dish';
import { IonItemSliding } from '@ionic/angular';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;
  constructor(private favoriteService: FavoriteService,
    @Inject('BaseURL') private BaseURL) {
  }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errMess => this.errMess = errMess);
  }

  deleteFavorite(item: IonItemSliding, id: number) {
    console.log('delete', id);
    this.favoriteService.deleteFavorite(id)
      .subscribe(favorites => this.favorites = favorites,
        errMess => this.errMess = errMess);

    item.close();
  }

}
