import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { Job } from '../models/job';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    JobList: Job[];

    constructor(
        private http: HttpClient
    ) { }

    getJobData(): Observable<Job[]> {        
        return Observable.create((observer: Subscriber<any>) => {
            if (isNullOrUndefined(this.JobList)) {
                this.http.get('https://nut-case.s3.amazonaws.com/jobs.json').toPromise().then((res: Job[]) => { 
                    this.JobList = res['data'].slice();
                    observer.next(this.JobList);
                    observer.complete();
                }); 
            } else {             
                observer.next(this.JobList.slice());
                observer.complete();
            }
        });
    }

}