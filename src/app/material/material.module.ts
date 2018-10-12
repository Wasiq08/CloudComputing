// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import {MatStepperModule} from '@angular/material/stepper';
import {Component} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

import {
  MatIconModule, MatAutocompleteModule,
  MatButtonModule, MatCheckboxModule, MatCardModule,
  MatFormFieldModule, MatDialogModule, MatProgressSpinnerModule,
  MatInputModule, MatSortModule, MatTabsModule, MatButtonToggleModule,
  MatChipsModule, MatRadioModule, MatOptionModule, MatSelectModule,
  MatTooltipModule, MatSidenavModule, MatToolbarModule, MatListModule,
  MatExpansionModule, MatProgressBarModule,
  MatMenuModule, MatTableModule, MatPaginatorModule, MatStepper
} from "@angular/material";
import {MatDatepickerModule} from '@angular/material/datepicker';

// import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    // BrowserAnimationsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule, MatButtonToggleModule,
    MatChipsModule, MatTabsModule, MatRadioModule,
    MatDialogModule, MatInputModule,
    MatTooltipModule, MatSidenavModule,
    MatToolbarModule, MatListModule,
    MatExpansionModule, MatProgressBarModule,
    MatMenuModule, MatTableModule, MatPaginatorModule,MatDatepickerModule
  ],

  exports: [
    // BrowserAnimationsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule, MatSortModule,
    MatButtonModule, MatTabsModule,
    MatButtonToggleModule, MatChipsModule,
    MatCheckboxModule, MatRadioModule,
    MatFormFieldModule, MatDialogModule,
    MatInputModule, MatSidenavModule,
    MatToolbarModule, MatListModule,
    MatExpansionModule, MatProgressBarModule,
    MatMenuModule, MatTableModule, MatPaginatorModule,MatStepperModule,
    MatDatepickerModule,MatGridListModule
  ]
})
export class MaterialModule { }