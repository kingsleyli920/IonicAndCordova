import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Dish } from '../../shared/dish';
import { DishService } from '../../app/services/dish.service';
import { Comment } from '../../shared/comment';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  @Input() dishId: number;
  comment: FormGroup;
  constructor(public modalCtrl: ModalController, 
    private formBuilder: FormBuilder,
    private dishService: DishService) { 
      this.comment = this.formBuilder.group({
        author: ['', Validators.required],
        rating: 5,
        comment:['', Validators.required]
      })
    }
  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    let dishId = this.dishId;
    let values = this.comment.value;
    values['date'] = new Date().toISOString();
    this.dishService.getDish(dishId).subscribe(
      dish => {dish.comments.push(values);
        const comments = dish.comments;
        this.modalCtrl.dismiss(
          {
            'comments': comments
          }
        );}
    );
    
  }
}
