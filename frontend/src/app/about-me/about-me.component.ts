import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: string;
  description: string;
  stars: number;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {
  isMobile = window.innerWidth <= 991;

  selectedSkill: Skill | null = null;
  activeLogo: string | null = null;

  skills: Record<string, Skill> = {
    logo1: {
      name: 'HTML5',
      level: 'Upper intermediate',
      description: 'Semantic structure for SPA sections and accessible layouts.',
      stars: 4,
    },
    logo2: {
      name: 'CSS3',
      level: 'Upper Intermediate',
      description: 'Responsive layouts, animations, modal effects and UI polish.',
      stars: 4,
    },
    logo3: {
      name: 'JavaScript',
      level: 'Elementary',
      description: 'Logic, events, state control and DOM interactions.',
      stars: 2,
    },
    logo4: {
      name: 'Bootstrap',
      level: 'Intermediate',
      description: 'Responsive grid, utilities and layout support.',
      stars: 3,
    },
    logo5: {
      name: 'Node.js',
      level: 'Elementary',
      description: 'REST API, authentication, file upload and email handling.',
      stars: 2,
    },
    logo6: {
      name: 'MySQL',
      level: 'Intermediate',
      description: 'Relational databases, joins and content management.',
      stars: 3,
    },
    logo7: {
      name: 'Angular',
      level: 'Elementary',
      description: 'SPA architecture, components, routing and resolvers.',
      stars: 2,
    },
    logo8: {
      name: 'Docker',
      level: 'Basic',
      description: 'Basic containerization for development environment.',
      stars: 1,
    },
  };

  /* ===== DESKTOP ===== */

  onHover(key: string) {
    if (!this.isMobile) {
      this.selectedSkill = this.skills[key];
      this.activeLogo = key;
    }
  }

  onLeave() {
    if (!this.isMobile) {
      this.selectedSkill = null;
      this.activeLogo = null;
    }
  }

  /* ===== MOBILE ===== */

  onClick(key: string, event: Event) {
    if (this.isMobile) {
      event.stopPropagation();
      this.selectedSkill = this.skills[key];
      this.activeLogo = key;
    }
  }

  onOutsideClick() {
    if (this.isMobile) {
      this.selectedSkill = null;
      this.activeLogo = null;
    }
  }
}