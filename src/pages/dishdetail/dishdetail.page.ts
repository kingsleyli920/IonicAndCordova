import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, delay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { FavoriteService } from '../../app/services/favorite.service';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dish: any;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;
  constructor(public navCtrl: NavController,
    private route: ActivatedRoute,
    @Inject('BaseURL') private BaseURL,
    private favoriteService: FavoriteService) {
    this.dish = JSON.parse(this.route.snapshot.paramMap.get('dish'));
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;

    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgstars = (total / this.numcomments).toFixed(2);
  }

  ngOnInit() {
  }

  addToFavorites() {
    console.log('adding to favorites', this.dish.id);
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
  }

}
