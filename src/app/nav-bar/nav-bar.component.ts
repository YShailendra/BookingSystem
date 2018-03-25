import {Component,OnInit} from '@angular/core';
import {SharedService} from '../services/shared.service'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public isAdmin:boolean =true;
  constructor(public sharedService:SharedService) { 

    // this.isAdmin = this.sharedService.IsAdmin();

  }
  showLogin=false;
  ngOnInit() {

    
  }
  isIn = false;   // store state
  toggleState() { // click handler
      let bool = this.isIn;
      this.isIn = bool === false ? true : false; 
  }
  LoginOpen()
  {
    this.showLogin=true;
  }

}
