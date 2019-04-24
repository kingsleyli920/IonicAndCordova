import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: '../pages/home/home.module#HomePageModule'
  },
  { path: 'about', loadChildren: '../pages/about/about.module#AboutPageModule' },
  { path: 'menu', loadChildren: '../pages/menu/menu.module#MenuPageModule' },
  { path: 'contact', loadChildren: '../pages/contact/contact.module#ContactPageModule' },
  { path: 'dishdetail/:dish', loadChildren: '../pages/dishdetail/dishdetail.module#DishdetailPageModule' },
  { path: 'favorites', loadChildren: '../pages/favorites/favorites.module#FavoritesPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
