import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { trigger,state, style ,transition,keyframes,animate } from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  ngOnInit() {
  }

}
