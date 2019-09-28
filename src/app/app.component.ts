import { Component } from '@angular/core';
import { JobService } from './services/job.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchParamsChangeSubscription: Subscription;

  arrChipList: object[] = [];
  objSearchParams: any;
  blnShowingAllJobs: boolean = true;

  constructor(
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.searchParamsChangeSubscription = this.notifyService.searchParamsChange.subscribe(params => {
      if (params) {
        this.objSearchParams = params;
        this.blnShowingAllJobs = (params.job_type == "all");
        this.setChipArr();
      }
    });
  }

  setChipArr() {
    this.arrChipList = [];
    if(this.objSearchParams.company != "") {
      this.arrChipList.push({ "key": "company", "value": this.objSearchParams.company });
    }
    if(this.objSearchParams.experience != "" && this.objSearchParams.experience != "-1" ) {
      this.arrChipList.push({ "key": "experience", "value": this.objSearchParams.experience + " years" });
    }
    if(this.objSearchParams.skill != "") {
      this.arrChipList.push({ "key": "skill", "value": this.objSearchParams.skill });
    }
    if(this.objSearchParams.location != "") {
      this.arrChipList.push({ "key": "location", "value": this.objSearchParams.location });
    }
  }
}
