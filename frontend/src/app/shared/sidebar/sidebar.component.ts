// sidebar.component.ts
import { Component, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() sidebarActive = false;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  // TYPEWRITER EFFECT FOR NAME
  fullName = "Anderson Moreton\nRodrigues"; // Name with line break
  @ViewChild('typewriterH1', { static: true }) h1!: ElementRef;
  currentIndex = 0;
  typingSpeed = 150;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.typeWriter();
  }

  typeWriter(): void {
    if (this.currentIndex < this.fullName.length) {
      const currentChar = this.fullName.charAt(this.currentIndex);
      const content = currentChar === '\n' ? document.createElement('br') : this.renderer.createText(currentChar);
      this.renderer.appendChild(this.h1.nativeElement, content);

      this.currentIndex++;
      setTimeout(() => this.typeWriter(), this.typingSpeed);
    }
  }
}

