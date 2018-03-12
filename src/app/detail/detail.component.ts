import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public currentClasses = "hid";
  constructor() { }

  ngOnInit() {
    
  }

  showModifySection(){
    if(this.currentClasses == "vis")
          this.currentClasses = "hid";
      else
        this.currentClasses = "vis"
      
      
    
    
    ;
      
  }


  
}
