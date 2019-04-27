import { Component, OnInit, Inject, Input } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../../app/services/favorite.service';
import { CommentPage } from '../comment/comment.page';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {
  @Input() comments: Comment[];
  dish: any;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;
  constructor(public navCtrl: NavController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    @Inject('BaseURL') private BaseURL,
    private favoriteService: FavoriteService) {
    this.dish = JSON.parse(this.route.snapshot.paramMap.get('dish'));
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
    
    this.getTotalAndAvg();
  }

  ngOnInit() {
    
  }

  async addToFavorites() {
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
    const toast = await this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as a favorite successfully',
      duration: 3000
    });
    toast.present();
  }
  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Albums',
      buttons: [{
        text: 'Add to Favorite',
        handler: () => {
          this.addToFavorites();
        }
      }, {
        text: 'Add a Comment',
        handler: () => {
         this.openCommentModal();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

  async openCommentModal() {
    const modal = await this.modalCtrl.create({
      component: CommentPage,
      componentProps: { dishId: this.dish.id }
    });
    modal.onDidDismiss().then(data => {
      this.dish.comments = data.data.comments;
      this.getTotalAndAvg();
    });
    return modal.present();
  }

  getTotalAndAvg() {
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgstars = (total / this.numcomments).toFixed(2);
  }

}
