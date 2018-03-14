import { Component, OnInit,ViewChild } from '@angular/core';
import {SeatlayoutComponent} from '../seatlayout/seatlayout.component'
import { Router, Params, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @ViewChild (SeatlayoutComponent)

  public currentClasses;
  private Source:any;      
  private Destination:any;
  private DJourney:any;
  constructor(private route:ActivatedRoute) {
      this.currentClasses = "hid";

    }

  ngOnInit() {
     this.Source = this.route.snapshot.params["Source"];
    this.Destination = this.route.snapshot.params["Destination"];
    this.DJourney = this.route.snapshot.params["JourneyDate"];

  }

  showModifySection(){
    if(this.currentClasses == "vis")
          this.currentClasses = "hid";
      else
        this.currentClasses = "vis";
  }

  

}
