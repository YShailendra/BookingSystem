import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { InterceptorModule } from './interceptor.module';
import { Select2Module } from 'ng2-select2';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap'; 
import { TabsModule } from 'ng2-bootstrap';
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
import { TicketComponent } from './booking/ticket.component';
import { DetailComponent } from './booking/detail.component';
import { LoginService } from './services/login.service';
import { SharedService } from './services/shared.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrModule } from 'ngx-toastr';
import { SeatlayoutComponent } from './booking/seatlayout.component';
import { BookingService } from './services/booking.service';
import { AdminComponent } from './admin/admin.component';
import { BusService} from './services/bus.service';
import { RegisterService } from './services/register.service';
import { ReportingComponent } from './admin/reporting.component';
import { UserComponent } from '../app/admin/user/user.component';
import { ReportingService } from '../app/services/reporting.service';

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
    SeatlayoutComponent,
    AdminComponent,
    ReportingComponent,
    UserComponent
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
    Select2Module, //select2 
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule
    
  ],
  providers: [LoginService,
              SharedService,CookieService,BookingService,BusService,RegisterService,ReportingService],
              bootstrap: [AppComponent],
  })
  
  export class AppModule { }
