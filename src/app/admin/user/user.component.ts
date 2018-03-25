import { Component, OnInit } from '@angular/core';
import {User} from '../../Models/user';
import {RegisterService} from  '../../services/register.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user:User;
  public message:any;

  constructor(private registerService:RegisterService,private sharedService:SharedService) { 

    this.user = new User();
  }

  ngOnInit() {
  }

  public createUser(){
      
    this.registerService.CreateUser(this.user).subscribe(data=>{
        this.sharedService.ShowSuccess("User Created Succesfully")
      
    },error=>{this.sharedService.ShowError("Unable to create User")});


  }

}
