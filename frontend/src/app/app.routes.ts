import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { homeResolver } from './home/home.resolver';
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

  // ADMIN
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    resolve: {
      testimonials: adminTestimonialsResolver
    }
  }
];