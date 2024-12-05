import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNGModules } from 'src/app/primeng.module';

@Component({
  selector: 'app-nodatafound',
  standalone: true,
  imports: [CommonModule, PrimeNGModules],
  templateUrl: './nodatafound.component.html',
  styleUrls: ['./nodatafound.component.scss'],
})
export class NodatafoundComponent {
  @Input('message') message: string = 'No Data Found!!!';
  @Input('fontSize') fontSize: number = 1.142;
}
