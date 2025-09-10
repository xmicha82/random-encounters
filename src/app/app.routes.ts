import { Routes } from '@angular/router';
import { EncountersComponent } from './encounters/encounters.component';
import { TablesComponent } from './tables/tables.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'encounters',
    pathMatch: 'full'
  },
  {
    path: 'encounters',
    component: EncountersComponent
  },
  {
    path: 'tables',
    component: TablesComponent
  }
];
