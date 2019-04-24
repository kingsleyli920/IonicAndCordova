import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../../shared/leader';
import { LeaderService } from '../../app/services/leader.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  leaders: Leader[];
  errMess: string;
  constructor( private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
      errmess => this.errMess = errmess);
     
  }

}
