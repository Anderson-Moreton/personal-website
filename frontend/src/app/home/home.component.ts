import { Component } from '@angular/core';
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
export class HomeComponent {

  sidebarActive = false; // controls the sidebar

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  // DEPOSITIONS (TESTIMONIALS)

  depositions = [
    {
      name: 'Otávio Moreton',
      hobby: 'Game',
      image: 'assets/img/otavio-logo.jpg',
      text: 'I love my dad. Congratulations for being such a dedicated student and always finding time to play with me.',
      likes: 0,
      liked: false
    },
    {
      name: 'Priscila Moreton',
      hobby: 'Trip',
      image: 'assets/img/priscila-logo.jpeg',
      text: 'Congratulations on your commitment and dedication, you are an example of determination. Keep it up! I love you!',
      likes: 0,
      liked: false
    },
    {
      name: 'Isabelle Gomes Aciolly',
      hobby: 'Music',
      image: 'assets/img/isabelle-logo.jpg',
      text: "Congratulations Anderson, your website looks amazing! I'm very proud of you and your hard work.",
      likes: 0,
      liked: false
    },
    {
      name: 'Paulo Gabriel Moreton',
      hobby: 'Sport',
      image: 'assets/img/gabriel-logo.PNG',
      text: "Dude, you're awesome! I really admire your dedication and effort. Keep it up, you'll go far! Hugs, brother!",
      likes: 0,
      liked: false
    }
  ];

  // LIKE HANDLER

  // Toggle like for a specific testimonial
  toggleLike(depo: any): void {
    depo.liked = !depo.liked;
    depo.likes += depo.liked ? 1 : -1;
  }

}