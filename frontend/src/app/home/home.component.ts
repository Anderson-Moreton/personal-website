import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sidebarActive = false;
  depositions: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Initial load
    this.depositions = this.route.snapshot.data['depositions'];

    // IMPORTANT: listen to route data changes
    this.route.data.subscribe(data => {
      this.depositions = data['depositions'];
    });
  }

  toggleLike(depo: any): void {
    if (depo.liked) return;

    depo.likes = (depo.likes ?? 0) + 1;
    depo.liked = true;
  }
}