import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { InterceptorModule } from './interceptor.module';

//local component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BookingComponent } from './booking/booking.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { ContactComponent } from './contact/contact.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing-module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { TicketComponent } from './ticket/ticket.component';
import { DetailComponent } from './detail/detail.component';
import { LoginService } from './services/login.service';
import { SharedService } from './services/shared.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrModule } from 'ngx-toastr';
import {SeatlayoutComponent} from './seatlayout/seatlayout.component';
import { BookingService } from './services/booking.service';
import {BookingModel} from './Models/booking';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    BookingComponent,
    CancellationComponent,
    ContactComponent,
    NavBarComponent,
    LoginComponent,
    NotFoundComponent,
    FooterComponent,
    TicketComponent,
    DetailComponent,
    SeatlayoutComponent
   
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    InterceptorModule,
    HttpModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [LoginService,
    SharedService,CookieService,BookingService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
