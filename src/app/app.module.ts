import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomePage } from '../pages/home/home.page';
import { AboutPage } from '../pages/about/about.page';
import { MenuPage } from '../pages/menu/menu.page';
import { ContactPage } from '../pages/contact/contact.page';
import { DishdetailPage } from '../pages/dishdetail/dishdetail.page';
import { FavoritesPage } from '../pages/favorites/favorites.page';
import { ReservationPage } from '../pages/reservation/reservation.page';

import { HomePageModule } from '../pages/home/home.module';
import { AboutPageModule } from '../pages/about/about.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { ContactPageModule } from '../pages/contact/contact.module';
import { DishdetailPageModule } from '../pages/dishdetail/dishdetail.module';
import { FavoritesPageModule } from '../pages/favorites/favorites.module';
import { ReservationPageModule } from '../pages/reservation/reservation.module';

import { DishService } from './services/dish.service';
import { LeaderService } from './services/leader.service';
import { PromotionService } from './services/promotion.service';
import { ProcessHttpmsgService } from './services/process-httpmsg.service';

import { baseURL } from '../shared/baseurl';
@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HomePageModule,
    AboutPageModule,
    MenuPageModule,
    ContactPageModule,
    HttpModule,
    DishdetailPageModule,
    FavoritesPageModule,
    ReservationPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DishService,
    LeaderService,
    PromotionService,
    ProcessHttpmsgService,
    { provide: 'BaseURL', useValue: baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
