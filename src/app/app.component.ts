import { Component } from '@angular/core';
import { JobService } from './services/job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'list-app';
  experience: number = 0;

  constructor(
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobService.getJobData().subscribe(res => console.log(res));
  }
}
