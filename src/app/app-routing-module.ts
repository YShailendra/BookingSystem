import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { RouteGuard } from './guards/route.guard';

//roles 1-Analyst,2-Admin 3-HotelManager 4-CEO
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
