import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

    public daysOptions =[];
  constructor() {

    this.daysOptions = [
        {
          option:"15 days",value:15,
        },
        {
          option:"30 days",value:30
        }
    ];

    
   }

  ngOnInit() {
  }


}
