import { Injectable } from '@angular/core';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs';

export class NotifyService {

    searchParamsChangeSubject = new BehaviorSubject(false);
    searchParamsChange: Observable<any>;

    constructor() {
        this.searchParamsChange = this.searchParamsChangeSubject.asObservable();
    }

    notifySearchParamsChange(data) {
        this.searchParamsChangeSubject.next(data);
    }

}