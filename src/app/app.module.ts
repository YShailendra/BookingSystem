import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';





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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
