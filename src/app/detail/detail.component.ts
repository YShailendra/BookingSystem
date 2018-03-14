import { Component, OnInit,ViewChild } from '@angular/core';
import {SeatlayoutComponent} from '../seatlayout/seatlayout.component'
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})


export class DetailComponent implements OnInit {

  public ishidTrue:boolean;
  public isShowTrue:boolean;

  @ViewChild(SeatlayoutComponent)
  public seatLayout:SeatlayoutComponent;

  private Source:any;      
  private Destination:any;
  private DJourney:any;
  constructor(private route:ActivatedRoute) {
      
    this.ishidTrue = true;
    this.isShowTrue= false;
    }

  ngOnInit() {
     this.Source = this.route.snapshot.params["Source"];
    this.Destination = this.route.snapshot.params["Destination"];
    this.DJourney = this.route.snapshot.params["JourneyDate"];
    
  }

  showModifySection(){
    if(this.ishidTrue == true){
      this.ishidTrue = false;
      this.isShowTrue=true;
  }else{
      this.ishidTrue=true;
      this.isShowTrue=false;
  }
}

showSection(){
  this.seatLayout["showSeatLayout"]();
    }
}