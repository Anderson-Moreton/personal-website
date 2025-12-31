import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessageComponent } from './message/message.component';
import { MyRepositoryComponent } from './my-repository/my-repository.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home
  { path: 'message', component: MessageComponent }, // Message
  { path: 'my-repository', component: MyRepositoryComponent }, // My repository
  { path: 'coming-soon', component: ComingSoonComponent } // Page empty
];
