import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ChipModule } from 'primeng/chip';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TimelineModule } from 'primeng/timeline';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { SelectButtonModule } from 'primeng/selectbutton';

const pModules = [
  CommonModule,
  FontAwesomeModule,
  ButtonModule,
  RippleModule,
  InputTextModule,
  InputNumberModule,
  ProgressSpinnerModule,
  MenubarModule,
  MenuModule,
  InputTextareaModule,
  TabViewModule,
  DropdownModule,
  ConfirmDialogModule,
  DialogModule,
  SidebarModule,
  PasswordModule,
  TableModule,
  PaginatorModule,
  OverlayPanelModule,
  SplitButtonModule,
  ChipModule,
  CalendarModule,
  CheckboxModule,
  TimelineModule,
  RadioButtonModule,
  TooltipModule,
  AccordionModule,
  SelectButtonModule,
];

@NgModule({
  imports: [...pModules],
  exports: [...pModules],
  providers: [ConfirmationService],
})
export class PrimeNGModules {}
