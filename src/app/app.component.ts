import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HomePage } from '../pages/home/home.page';
import { AboutPage } from '../pages/about/about.page';
import { MenuPage } from '../pages/menu/menu.page';
import { ContactPage } from '../pages/contact/contact.page';
import { FavoritesPage } from '../pages/favorites/favorites.page';
import { ReservationPage } from '../pages/reservation/reservation.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      component: HomePage
    },
    {
      title: 'About US',
      url: '/about',
      icon: 'information-circle',
      component: AboutPage
    },
    {
      title: 'Menu',
      url: '/menu',
      icon: 'list-box',
      component: MenuPage
    },
    {
      title: 'Contact US',
      url: '/contact',
      icon: 'contact',
      component: ContactPage
    },
    {
      title: 'My Favorites',
      url: '/favorites',
      icon: 'heart',
      component: FavoritesPage
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async openReserve() {
    const modal = await this.modalCtrl.create({
      component: ReservationPage
    });
    return modal.present();
  }
}
