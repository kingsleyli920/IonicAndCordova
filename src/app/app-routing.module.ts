import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  { path: 'comment', loadChildren: '../pages/comment/comment.module#CommentPageModule' },
  { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: '../pages/register/register.module#RegisterPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
