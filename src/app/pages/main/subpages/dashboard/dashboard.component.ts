import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  interpolationBinding: string = 'Hello World';

  styleColor: string = 'red';

  items: any[] = [
    {
      name: 'Name',
      age: 20,
      status: null,
    },
  ];

  twoWayBinding: string = '';

  eventBinding() {}
}
