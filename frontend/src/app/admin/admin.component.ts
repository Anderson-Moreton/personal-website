import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AdminService } from '../services/admin.service';

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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadPendingMessages();
  }

  loadPendingMessages(): void {
    this.loading = true;

    this.adminService.getPendingMessages().subscribe({
      next: (messages) => {
        console.log('Pending messages:', messages);
        this.pendingMessages = messages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading pending messages:', error);
        this.loading = false;
      }
    });
  }

  approve(id: number): void {
    this.adminService.approveMessage(id).subscribe(() => {
      this.loadPendingMessages(); // reload list
    });
  }

  reject(id: number): void {
    this.adminService.rejectMessage(id).subscribe(() => {
      this.loadPendingMessages(); // reload list
    });
  }
}