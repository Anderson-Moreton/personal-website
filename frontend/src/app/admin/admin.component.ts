import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AdminService } from '../services/admin.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  sidebarActive = false;
  pendingMessages: any[] = [];
  loading = true;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Load when component starts
    this.loadPendingMessages();

    // IMPORTANT: reload when navigating to /admin again
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        if (this.router.url === '/admin') {
          this.loadPendingMessages();
        }
      });
  }

  loadPendingMessages(): void {
   this.loading = true;

   this.adminService.getPendingMessages().subscribe({
     next: (messages) => {
       console.log('Pending messages:', messages);

       this.pendingMessages = [...messages];
       this.loading = false;

      // Force view update
       this.cdr.detectChanges();
     },
     error: (error) => {
       console.error('Error loading pending messages:', error);
       this.loading = false;
      }
    });
  }

  approve(id: number): void {
    this.adminService.approveMessage(id).subscribe(() => {
      // remove locally (UX instantâneo)
      this.pendingMessages = this.pendingMessages.filter(m => m.id !== id);
    });
  }

  reject(id: number): void {
    this.adminService.rejectMessage(id).subscribe(() => {
      this.pendingMessages = this.pendingMessages.filter(m => m.id !== id);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}