import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output('closeSideNav') closeSideNav = new EventEmitter();

  experience: string = "-1";

  jobType: string = "all";
  company: string = "";
  location: string = "";
  skill: string = "";

  arrExperienceOptions: object[] = [];

  constructor(
    private notifyService: NotifyService
  ) {
    this.arrExperienceOptions = [
      { key: "-1", value: "All"},
      { key: "0", value: "Fresher" },
      { key: "1", value: "1 years" },
      { key: "2", value: "2 years" },
      { key: "3", value: "3 years" },
      { key: "4", value: "4 years" },
      { key: "5", value: "5 years" },
      { key: "6", value: "6 years" },
      { key: "7", value: "7 years" },
      { key: "8", value: "8 years" },
      { key: "9", value: "9 years" },
      { key: "10", value: "10 years" },
      { key: "11", value: "11 years" },
      { key: "12", value: "12 years" },
      { key: "13", value: "13 years" },
      { key: "14", value: "14 years" },
      { key: "15", value: "15+ years" },      
    ]
  }

  ngOnInit() {
  }

  closeSidenav() {
    this.closeSideNav.emit(true);
  }

  onSearchApply() {
    this.notifyService.notifySearchParamsChange(this.getParamsObject());
  }

  onSearchReset() {
    this.company = "";
    this.experience = "-1";
    this.skill = "";
    this.location = "";
    this.notifyService.notifySearchParamsChange(this.getParamsObject());
  }

  getParamsObject() {
    return {
      "company": this.company,
      "experience": this.experience,
      "skill": this.skill,
      "location": this.location,
      "job_type": this.jobType,      
    }
  }

}
