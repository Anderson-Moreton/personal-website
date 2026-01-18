import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { homeResolver } from './home/home.resolver';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { MyRepositoryComponent } from './my-repository/my-repository.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';

import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { adminTestimonialsResolver } from './admin/admin.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      depositions: homeResolver
    }
  },

  { path: 'about-me', component: AboutMeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'my-repository', component: MyRepositoryComponent },
  { path: 'coming-soon', component: ComingSoonComponent },

  // Admin Login (PUBLIC)
  { path: 'admin/login', component: AdminLoginComponent },

  // Admin Panel (PROTECTED)
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard], 
    resolve: {
      testimonials: adminTestimonialsResolver
    }
  }
];