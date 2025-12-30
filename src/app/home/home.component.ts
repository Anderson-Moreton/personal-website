import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  // DEPOSITIONS SECTION
  depositions = [
    {
      name: 'Otávio Moreton',
      hobby: 'Game',
      image: 'assets/img/otavio-logo.jpg',
      text: "I love my dad. Congratulations for being such a dedicated student and always finding time to play with me.",
      likes: 0,
      liked: false
    },
    {
      name: 'Priscila Moreton',
      hobby: 'Trip',
      image: 'assets/img/priscila-logo.jpeg',
      text: "Congratulations on your commitment and dedication, you are an example of determination. Keep it up! I love you!",
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

  // Toggle like for a specific deposition
  toggleLike(depo: any) {
    depo.liked = !depo.liked;
    depo.likes += depo.liked ? 1 : -1;
  }

  // SIDEBAR TOGGLE
  sidebarActive = false;
  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  // TYPEWRITER EFFECT FOR NAME
  fullName = "Anderson Moreton\nRodrigues"; // full name with line break
  currentIndex = 0; // current character index
  typingSpeed = 150; // typing speed in ms

  // Reference to the h1 element in the template
  @ViewChild('typewriterH1', { static: true }) h1!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.typeWriter();
  }

  // Typewriter function using Renderer2
  typeWriter(): void {
    if (this.currentIndex < this.fullName.length) {
      const currentChar = this.fullName.charAt(this.currentIndex);
      const content = currentChar === '\n' ? document.createElement('br') : this.renderer.createText(currentChar);

      if (currentChar === '\n') {
        this.renderer.appendChild(this.h1.nativeElement, content);
      } else {
        this.renderer.appendChild(this.h1.nativeElement, content);
      }

      this.currentIndex++;
      setTimeout(() => this.typeWriter(), this.typingSpeed);
    }
  }

}