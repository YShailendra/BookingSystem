import { Component, OnInit,Input,Output,EventEmitter,OnDestroy } from '@angular/core';
import { trigger,state, style ,transition,keyframes,animate } from '@angular/animations';
import { LoginService } from '../services/login.service';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'translateY(1000px)' }),
        animate('2s cubic-bezier(.2,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1}))
      ]),
      transition('* => void', [
        style({ transform: 'translateY(0px)' }),
        animate('3s cubic-bezier(.2,-0.48,.26,1.52)', style({transform: 'translateY(1000px)', opacity: 1}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  //component model
  public Username:string;
  public Password:string;
  private sub:any;
  constructor(private loginService:LoginService,private sharedService:SharedService) { }
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  ngOnInit() {
  }
  public Login()
  {
    if(!this.Validate())
    { 
      return;
    }
    
     this.sub= this.loginService.Login(this.Username,this.Password).subscribe(s=>{ 
      var data=s.body as any;
      if(s.status===200)
      {
        console.log(data);
        if(data.Token)
        {
          this.visible=false;
          this.sharedService.SetLoginInfo(data);
        }
      } 
      else
      {
        this.sharedService.ShowError(data);
      }
      },error=>{this.sharedService.ShowError("Error in login from server")});
  }
  //on component destroy
  ngOnDestroy()
  {
    this.sub.unsubscribe();//clearing the memory on component end
  }
  private  Validate()
  {
    var isValid=true;
    if(!this.Username || this.Username=="")
    {
      this.sharedService.ShowWarning("Please enter number");
      isValid=false;
    }
    else if(!this.Password ||this.Password=="")
    {
      this.sharedService.ShowWarning("Please enter password");
      isValid=false;
    }
   
    return isValid;
  }
}
