import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./seatlayout.component.css']
})
export class SeatlayoutComponent implements OnInit {
  public isDisplayed = "hid";
  constructor() { }

  ngOnInit() {
  }
 @Input() display(){
    if(this.isDisplayed == "vis")
          this.isDisplayed = "hid";
      else
        this.isDisplayed = "vis";
  }

}
