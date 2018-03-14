import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./seatlayout.component.css']
})
export class SeatlayoutComponent implements OnInit {
  // public isDisplayed = "hid";

  public ishidTrue;
  public isShowTrue;
  constructor() { 
    this.ishidTrue = true;
    this.isShowTrue= false;
  }

  ngOnInit() {



  }

  @Input() showSeatLayout(){
    if(this.ishidTrue == true){
      this.ishidTrue = false;
      this.isShowTrue=true;
  }else{
      this.ishidTrue=true;
      this.isShowTrue=false;
  }

  }
//  @Input() display(){
//     if(this.isDisplayed == "vis")
//           this.isDisplayed = "hid";
//       else
//         this.isDisplayed = "vis";
//   }

}
