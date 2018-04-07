import { Component, OnInit } from '@angular/core';
import {trigger, stagger, animate, style, group, query as q, transition, keyframes} from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

export const homeTransition = trigger('homeTransition', [
  // transition(':enter', [
  //   query('.my-footer', style({ opacity: 0 })),
  //   query('.my-footer', stagger(300, [
  //     style({ transform: 'translateY(100px)' }),
  //     animate('500ms cubic-bezier(.2,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
  //   ])),
  // ]),
  transition(':leave', [
    query('.my-footer', stagger(10, [
      style({ transform: 'translateY(100px)', opacity: 1 }),
      animate('1s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(-100px)', opacity: 0})),
    ])),        
  ])
])
@Component({
  
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'], 
  animations: [ homeTransition ],
  host: {
    '[@homeTransition]': ''
  }


})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
