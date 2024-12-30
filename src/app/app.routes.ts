import { Routes } from '@angular/router';
import { PropertyTableComponent } from './property-table/property-table.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';

export const routes: Routes = [
  { path: '', component: PropertyTableComponent },
  { path: 'details/:id', component: PropertyDetailsComponent },
];
