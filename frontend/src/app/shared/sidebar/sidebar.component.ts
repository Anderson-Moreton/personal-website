import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  @Input() sidebarActive = false;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  fullName = 'Anderson Moreton\nRodrigues';
  @ViewChild('typewriterH1', { static: true }) h1!: ElementRef;
  currentIndex = 0;
  typingSpeed = 150;

  @ViewChildren('iconItem') iconItems!: QueryList<ElementRef>;
  @ViewChild('arrow') arrow!: ElementRef;

  private arrowInterval: any;
  private currentArrowIndex = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.typeWriter();
  }

  typeWriter(): void {
    if (this.currentIndex < this.fullName.length) {
      const char = this.fullName.charAt(this.currentIndex);
      const node =
        char === '\n'
          ? document.createElement('br')
          : this.renderer.createText(char);

      this.renderer.appendChild(this.h1.nativeElement, node);

      this.currentIndex++;
      setTimeout(() => this.typeWriter(), this.typingSpeed);
    }
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  startArrow(): void {
    const items = this.iconItems.toArray();

    if (!items.length || !this.arrow) return;

    this.arrow.nativeElement.style.opacity = '1';
    this.arrowInterval = setInterval(() => {
      const currentItem = items[this.currentArrowIndex].nativeElement;
      const arrowWidth = this.arrow.nativeElement.offsetWidth;

      this.arrow.nativeElement.style.left =
        currentItem.offsetLeft +
        currentItem.offsetWidth / 2 -
        arrowWidth / 2 +
        'px';

      this.currentArrowIndex =
        (this.currentArrowIndex + 1) % items.length;
      }, 600);
  }

  stopArrow(): void {
    clearInterval(this.arrowInterval);
    this.currentArrowIndex = 0;

    if (this.arrow) {
      this.arrow.nativeElement.style.opacity = '0';
    }
  }
}