import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Sidebar toggle
  sidebarActive = false;

  // Messages that will appear on Home (from backend)
  homeMessages: any[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadHomeMessages();
  }

  /**
   * Load messages authorized to appear on Home
   */
  loadHomeMessages(): void {
    this.homeService.getHomeMessages().subscribe({
      next: (messages) => {
        this.homeMessages = messages;
        console.log('Home messages:', messages);
      },
      error: (error) => {
        console.error('Error loading home messages:', error);
      }
    });
  }
}