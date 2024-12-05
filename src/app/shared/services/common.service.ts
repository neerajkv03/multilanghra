import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { GlobalService } from '@services/global.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private router: Router, private globalService: GlobalService) {}
  private readonly loaderSubject: BehaviorSubject<boolean> =
    new BehaviorSubject(false);
  private readonly sidebarSubject: BehaviorSubject<boolean> =
    new BehaviorSubject(false);

  getLoaderSubjectRef(): Observable<boolean> {
    return this.loaderSubject.asObservable();
  }
  setLoaderState(state: boolean): void {
    this.loaderSubject.next(state);
  }

  getSidebarSubjectRef(): Observable<boolean> {
    return this.sidebarSubject.asObservable();
  }
  setSidebarState(state: boolean) {
    this.sidebarSubject.next(state);
  }
}
