import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {
  @Input('data') data;

  constructor() { }

  ngOnInit() {
  }

  onNavigate(item){
    window.open(item.applylink, "_blank");
  }

}
