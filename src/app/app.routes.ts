import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyRepositoryComponent } from './my-repository/my-repository.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home
  { path: 'my-repository', component: MyRepositoryComponent } // My repository
];
