import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  
  constructor() { }

   public travelDate:any = new Date();
   public returnDate:any = new Date();

  ngOnInit() {
  }

}

