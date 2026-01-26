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
  sidebarActive = false;

  isMobile = window.innerWidth <= 991;

  skills: Record<string, Skill> = {
    logo1: { name: 'HTML5', level: 'Intermediate', description: 'Experience creating semantic and accessible web pages.', stars: 4 },
    logo2: { name: 'CSS3', level: 'Intermediate', description: 'Responsive layouts, Flexbox and Grid.', stars: 3 },
    logo3: { name: 'JavaScript', level: 'Basic', description: 'DOM manipulation and basic logic.', stars: 1 },
    logo4: { name: 'Bootstrap', level: 'Intermediate', description: 'Fast and responsive UI components.', stars: 3 },
    logo5: { name: 'Node.js', level: 'Basic', description: 'Basic backend concepts.', stars: 1 },
    logo6: { name: 'MySQL', level: 'Basic', description: 'Queries, joins and database structure.', stars: 2 },
    logo7: { name: 'Angular', level: 'Basic', description: 'Component structure and basic bindings.', stars: 1 },
    logo8: { name: 'Docker', level: 'Basic', description: 'Containers and basic configuration.', stars: 1 }
  };

  selectedSkill: Skill | null = null;

  /* Desktop hover */
  onHover(key: string) {
    if (!this.isMobile) {
      this.selectedSkill = this.skills[key];
    }
  }

  onLeave() {
    if (!this.isMobile) {
      this.selectedSkill = null;
    }
  }

  /* Mobile click */
  onClick(key: string, event: Event) {
    if (this.isMobile) {
      event.stopPropagation(); 
      this.selectedSkill = this.skills[key];
    }
  }

  /* Click out (mobile) */
  onOutsideClick() {
    if (this.isMobile) {
      this.selectedSkill = null;
    }
  }
}