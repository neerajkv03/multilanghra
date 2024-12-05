import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNGModules } from 'src/app/primeng.module';
import { NodatafoundComponent } from '@components/nodatafound/nodatafound.component';

@Component({
  selector: 'app-paginitated-table',
  standalone: true,
  imports: [CommonModule, PrimeNGModules, NodatafoundComponent],
  templateUrl: './paginitated-table.component.html',
  styleUrls: ['./paginitated-table.component.scss'],
})
export class PaginitatedTableComponent implements OnInit {
  constructor() {}
  @Input('renderFor') renderFor: string | undefined = '';
  @Input('paginatedTable') paginatedTable: boolean = false;
  @Input('totalTableRecords') totalTableRecords: number = 0;
  @Input('tableRows') tableRows: number = 10;
  @Input('tableCols') tableCols: {
    label: string;
    field: string;
    sorting?: boolean;
  }[] = [];
  @Input('tableData') tableData: any[] = [];
  @Output('tablePageChanged') tablePageChanged: EventEmitter<any> =
    new EventEmitter<any>();
  @Output('action') action: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}
}
