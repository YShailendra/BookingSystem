import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { RouteGuard } from './guards/route.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

//roles 1-Analyst,2-Admin 3-HotelManager 4-CEO
const routes: Routes = [
  {
    path: 'login',
    canActivate:[RouteGuard],
    component: LoginComponent
  },
  {
    path: '',//default url
    component: HomeComponent
  },
  {
    path: '**',//default url
    component: NotFoundComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
