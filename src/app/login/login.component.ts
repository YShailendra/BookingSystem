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
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'scale3d(.0, .0, .0)' }))
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
     this.sub= this.loginService.Login(this.Username,this.Password).subscribe(s=>{ 
       var data=s as any;
       console.log(data);
       //this.visible=false;
       if(data.Value)
       {
        this.visible=false;
        this.sharedService.SetToken(data.Value); 
       }
      },error=>{});
  }
  //on component destroy
  ngOnDestroy()
  {
    this.sub.unsubscribe();//clearing the memory on component end
  }
}
