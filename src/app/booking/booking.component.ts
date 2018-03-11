import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) {
    
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(s=>{
      console.log(s)
    });
  }

}
