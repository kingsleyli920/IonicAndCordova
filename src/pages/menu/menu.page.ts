import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Dish } from '../../shared/dish';
import { DishService } from '../../app/services/dish.service';
import { FavoriteService } from '../../app/services/favorite.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  errMess: string;
  constructor(public nav: NavController, 
    // public navParams: NavParams,
    private dishservice: DishService,
    private favoriteService: FavoriteService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = errmess)
  }

  dishSelected(event, dish) {

    let dishStr = JSON.stringify(dish);
    this.nav.navigateForward(['dishdetail', dishStr]);
  }

  addToFavorites(dish: Dish) {
    console.log('adding to favorites', dish.id);
    this.favoriteService.addFavorite(dish.id);
  }
}
