import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Dish } from '../../shared/dish';
import { DishService } from '../../app/services/dish.service';
import { Promotion } from '../../shared/promotion';
import { PromotionService } from '../../app/services/promotion.service';
import { Leader } from '../../shared/leader';
import { LeaderService } from '../../app/services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promotionErrMess: string;
  leaderErrMess: string;

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe(
        dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess
      );

      this.promotionService.getFeaturedPromotion()
      .subscribe(
        promotion => this.promotion = promotion,
        errmess => this.promotionErrMess = <any>errmess
      );

      this.leaderService.getFeaturedLeader()
      .subscribe(
        leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess
      );
  }
  constructor(public navCtril: NavController,
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }
}
