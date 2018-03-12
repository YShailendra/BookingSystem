import { Component, OnInit,ViewChild } from '@angular/core';
import {SeatlayoutComponent} from '../seatlayout/seatlayout.component'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @ViewChild (SeatlayoutComponent)

  public currentClasses = "hid";
  constructor() { }

  ngOnInit() {
    
  }

  showModifySection(){
    if(this.currentClasses == "vis")
          this.currentClasses = "hid";
      else
        this.currentClasses = "vis";
  }

}
