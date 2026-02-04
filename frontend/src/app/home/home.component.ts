import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { HomeService } from '../services/home.service';
import { MessageModalComponent } from '../message-modal/message-modal.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ContactComponent } from '../contact/contact.component';
import { MyRepositoryComponent } from '../my-repository/my-repository.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    NavbarComponent,
    MessageModalComponent,
    AboutMeComponent,
    ContactComponent,
    MyRepositoryComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  sidebarActive = false;

  depositions: any[] = [];
  hasDepositions = false;
  isLoadingDepositions = true;

  isModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.depositions = data['depositions'] ?? [];
        this.hasDepositions = this.depositions.length > 0;
        this.restoreLikesFromLocalStorage();
        this.isLoadingDepositions = false;
      },
      error: () => {
        this.depositions = [];
        this.hasDepositions = false;
        this.isLoadingDepositions = false;
      }
    });
  }

  /* ===== SCROLL ANIMATION ===== */
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal')
      .forEach(el => observer.observe(el));
  }

  /* ===== LIKES ===== */
  toggleLike(depo: any): void {
    depo.likes = Number(depo.likes ?? 0);

    if (!depo.liked) {
      depo.liked = true;
      depo.likes += 1;
      this.saveLike(depo.id);

      this.homeService.likeMessage(depo.id).subscribe({
        next: (res: any) => {
          depo.liked = res.liked;
          depo.likes = res.likes;
        },
        error: () => {
          depo.liked = false;
          depo.likes = Math.max(depo.likes - 1, 0);
          this.removeLike(depo.id);
        }
      });
      return;
    }

    depo.liked = false;
    depo.likes = Math.max(depo.likes - 1, 0);
    this.removeLike(depo.id);

    this.homeService.unlikeMessage(depo.id).subscribe({
      next: (res: any) => {
        depo.liked = res.liked;
        depo.likes = res.likes;
      },
      error: () => {
        depo.liked = true;
        depo.likes += 1;
        this.saveLike(depo.id);
      }
    });
  }

  private restoreLikesFromLocalStorage(): void {
    this.depositions.forEach(depo => {
      depo.liked = localStorage.getItem(`liked_message_${depo.id}`) === 'true';
    });
  }

  private saveLike(id: number): void {
    localStorage.setItem(`liked_message_${id}`, 'true');
  }

  private removeLike(id: number): void {
    localStorage.removeItem(`liked_message_${id}`);
  }

  /* ===== MODAL ===== */
  openModal(): void {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.isModalOpen) {
      this.closeModal();
    }
  }
}