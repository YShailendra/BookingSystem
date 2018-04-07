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
import { AdminComponent } from './admin/admin.component';
import { ReportingComponent } from './admin/reporting.component';
import { UserComponent } from './admin/user/user.component';


//roles 1-Analyst,2-Admin 3-HotelManager 4-CEO
const routes: Routes = [
  {
    path: 'login',
    canActivate:[RouteGuard],
    component: LoginComponent
  },
  {
    path: '',//default url
    component: HomeComponent,
    data: { state: 'home' } 
  },
  // {
  //   path: '**',//default url
  //   component: HomeComponent
  // },
  {
    path:'about',
    component: AboutusComponent,
    data: { state: 'about' } 
  },
  {
    path:'booking',
    component: BookingComponent,
    data: { state: 'booking' } 
  },
  {
    path:'cancellation',
    component: CancellationComponent,
    data: { state: 'cancellation' }  
  },
  {
    path:'contact',
    component: ContactComponent,
    data: { state: 'contact' } 
  },
  {
    path:'detail',
    component: DetailComponent,
    data: { state: 'detail' } 
  },
  {
    path:'ticket',
    component:TicketComponent
    
  },
  {
    path:'admin',
    // canActivate:[RouteGuard],
    // data:{expectedRole:true},
    component:AdminComponent,
    
  },
  {
    path:'reports',
    // canActivate:[RouteGuard],
    // data:{expectedRole:true},
    component:ReportingComponent
  },
  {
    path:'user',
    component:UserComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
