import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../services/notify.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { JobService } from 'src/app/services/job.service';
import { filterData } from 'src/app/functions/common';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit, OnDestroy {
  experience: number = 0;
  pageSize: number = 10;
  pageLength: number = 0;
  pageNumber: number = 1;

  arrJobList: Job[] = [];
  arrSlicedJobList: Job[] = [];

  searchParamsChangeSubscription: Subscription;

  constructor(
    private notifyService: NotifyService,
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.getJobs(false);
    this.searchParamsChangeSubscription = this.notifyService.searchParamsChange.subscribe(params => {
      if(params) {
        this.getJobs(params);
      }
    });
  }

  getJobs(params) {
    this.jobService.getJobData().subscribe(res => {
      this.arrJobList = filterData(res, params);
      this.pageLength = this.arrJobList.length;
      this.pageNumber = 1;
      this.arrSlicedJobList = this.arrJobList.slice(0, (this.pageNumber * this.pageSize));
    });
  }
  ngOnDestroy() {
    if(this.searchParamsChangeSubscription) { this.searchParamsChangeSubscription.unsubscribe(); }
  }

  onPageChange($event) {
    let index = ($event.pageIndex * this.pageSize);
    this.pageNumber = $event.pageIndex + 1;
    this.arrSlicedJobList = this.arrJobList.slice(index, index + this.pageSize);
  }

}
