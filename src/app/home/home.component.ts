import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { BookingModel } from '../models/booking'
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { BookingData } from '../Models/booking-data';
import { Select2OptionData } from 'ng2-select2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {trigger, stagger, animate, style, group, query as q, transition, keyframes} from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

export const homeTransition = trigger('homeTransition', [
  transition(':enter', [
    query('.bus-image', style({ opacity: 0 })),
    query('.bus-image', stagger(300, [
      style({ transform: 'translateY(100px)' }),
      animate('2s cubic-bezier(.2,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
    ])),
  ]),
  transition(':leave', [
    query('.bus-image', stagger(300, [
      style({ transform: 'translateY(0px)', opacity: 1 }),
      animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(100px)', opacity: 0})),
    ])),        
  ])
])

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
//   animations: [
//     trigger(
//       'enterAnimation', [
//         transition(':enter', [
//           style({ transform: 'translateY(100%)', opacity: 1 }),
//           animate('2000ms', style({ transform: 'translateY(0)', opacity: 1 }))
//         ]),
//         transition(':leave', [
//           style({ transform: 'translateY(0)', opacity: 1 }),
//           animate('2000ms', style({ transform: 'translateY(100%)', opacity: 1 }))
//         ])
//       ]
//     ),
//     trigger('slideInOutAnimation', [
//       // end state styles for route container (host)
//       state('*', style({
//           // the view covers the whole screen with a semi tranparent background
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.8)'
//       })),

//       // route 'enter' transition
//       transition(':enter', [

//           // styles at start of transition
//           style({
//               // start with the content positioned off the right of the screen,
//               // -400% is required instead of -100% because the negative position adds to the width of the element
//               right: '-400%',

//               // start with background opacity set to 0 (invisible)
//               backgroundColor: 'rgba(0, 0, 0, 0)'
//           }),

//           // animation and styles at end of transition
//           animate('.5s ease-in-out', style({
//               // transition the right position to 0 which slides the content into view
//               right: 0,

//               // transition the background opacity to 0.8 to fade it in
//               backgroundColor: 'rgba(0, 0, 0, 0.8)'
//           }))
//       ]),

//       // route 'leave' transition
//       transition(':leave', [
//           // animation and styles at end of transition
//           animate('.5s ease-in-out', style({
//               // transition the right position to -400% which slides the content out of view
//               right: '-400%',

//               // transition the background opacity to 0 to fade it out
//               backgroundColor: 'rgba(0, 0, 0, 0)'
//           }))
//       ])
//     ]),
//     trigger('image', [
//       transition(':enter', [
//         query('*', [
//           style({ transform: 'translateX(200px)', opacity: 0 }),
//           stagger(50, [
//             animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
//           ])
//         ])
//       ]),
//       transition(':leave',[
//         query('*',[
//       style({ transform: 'translateX(-200px)', opacity: 0 }),
//       stagger(50, [
//         animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
//       ])
//       ])
//   ])
// ]),
// trigger('slideRight',[
//   transition(':enter',[
//     query('*',[
//       style({transform:'translateX(-200px)',opacity:0}),
//       stagger(100,[
//         animate('1200ms cubic-bezier(.35,0,.25,1)',style('*'))
//       ])
//     ])
//   ])
// ]),
//   ],
  animations: [ homeTransition ],
  host: {
    '[@homeTransition]': ''
  }
})
export class HomeComponent implements OnInit {

  public travelDate: any = new Date();
  public returnDate: any = new Date();
  public todaysdate: any;
  public booking: BookingData;
  public Options1 = [];
  public Options2 = [];
  constructor(private sharedService: SharedService, private router: Router) {
    this.booking = new BookingData();
    this.Options1 = this.sharedService.GetRouteData();
    this.Options2 = this.sharedService.GetRouteData();
    this.booking.Source = "";
    this.booking.Destination = "";
    this.todaysdate = new Date();
    //  this.booking.JourneyDate =  new Date().toString().split('T')[0] as any;

  }


  ngOnInit() {
  }
  OnSelectionChange() {
    var data = [];
    Object.assign(data, this.sharedService.GetRouteData());
    var data2 = [];
    Object.assign(data2, this.sharedService.GetRouteData());
    this.Options1 = data.filter(s => s != this.booking.Destination);
    this.Options2 = data2.filter(s => s != this.booking.Source);
  }
  NextBookingDetails() {
    if (this.Validation()) {
      this.router.navigate(['./detail', { Source: this.booking.Source, Destination: this.booking.Destination, JourneyDate: this.booking.JourneyDate, ReturnJourneyDate: this.booking.ReturnJourneyDate }])
    }

  }
  Validation() {
    var IsValid = true;
    if (!this.booking.Source && this.booking.Source == '') {
      IsValid = false;
      this.sharedService.ShowInfo("Please provide the source")
    }
    else if (!this.booking.Destination && this.booking.Destination == '') {
      IsValid = false;
      this.sharedService.ShowInfo("Please provide the destination")
    }
    else if (!this.booking.JourneyDate && this.booking.JourneyDate != null) {
      IsValid = false;
      this.sharedService.ShowInfo("Please provide the journey date")
    }
    return IsValid;
  }
}

