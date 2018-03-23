import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { RouteGuard } from './guards/route.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import {AboutusComponent} from './aboutus/aboutus.component';
import {BookingComponent} from './booking/booking.component';
import {CancellationComponent} from './cancellation/cancellation.component';
import {ContactComponent} from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import {DetailComponent} from './booking/detail.component';
import {TicketComponent} from './booking/ticket.component';


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
  // {
  //   path: '**',//default url
  //   component: HomeComponent
  // },
  {
    path:'about',
    component: AboutusComponent
  },
  {
    path:'booking',
    component: BookingComponent
  },
  {
    path:'cancellation',
    component: CancellationComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  {
    path:'detail',
    component: DetailComponent
  },
  {
    path:'ticket',
    component:TicketComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
