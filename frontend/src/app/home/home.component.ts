import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  sidebarActive = false;
  depositions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    // Initial load from resolver
    this.depositions = this.route.snapshot.data['depositions'];

    // Listen to resolver updates (important for navigation)
    this.route.data.subscribe(data => {
      this.depositions = data['depositions'];
      this.restoreLikesFromLocalStorage();
    });
  }

  /**
   * Toggle like / unlike
   * Backend = source of truth for count
   * localStorage = prevent multiple likes
   */
  toggleLike(depo: any): void {
    depo.likes = Number(depo.likes ?? 0);

    // LIKE
    if (!depo.liked) {
      depo.liked = true;
      depo.likes += 1;
      this.saveLike(depo.id);

      this.homeService.likeMessage(depo.id).subscribe({
        error: () => {
          // Rollback if backend fails
          depo.liked = false;
          depo.likes -= 1;
          this.removeLike(depo.id);
        }
      });

      return;
    }

    // UNLIKE
    depo.liked = false;
    depo.likes = Math.max(depo.likes - 1, 0);
    this.removeLike(depo.id);

    this.homeService.unlikeMessage(depo.id).subscribe({
      error: () => {
        // Rollback if backend fails
        depo.liked = true;
        depo.likes += 1;
        this.saveLike(depo.id);
      }
    });
  }

  // Restore only the liked state (NOT the counter)
  private restoreLikesFromLocalStorage(): void {
    this.depositions.forEach(depo => {
      const liked = localStorage.getItem(`liked_message_${depo.id}`);
      depo.liked = liked === 'true';
    });
  }

  // Save like locally
  private saveLike(messageId: number): void {
    localStorage.setItem(`liked_message_${messageId}`, 'true');
  }

  // Remove like locally
  private removeLike(messageId: number): void {
    localStorage.removeItem(`liked_message_${messageId}`);
  }
}