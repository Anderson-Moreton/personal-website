import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-repository',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-repository.component.html',
  styleUrls: ['./my-repository.component.css']
})
export class MyRepositoryComponent {

  sidebarActive = false;

  projects = [
    {
      title: 'Personal Website',
      description:
        'Website developed to showcase my projects using HTML, CSS, Bootstrap, JavaScript and Angular.',
      image: 'assets/img/profileRepository.png',
      link: 'https://github.com/Anderson-Moreton'
    },
    {
      title: 'Dashboard Power BI',
      description:
        'Interactive dashboard for data analysis and decision support.',
      image: 'assets/img/profileRepository.png',
      link: 'https://github.com/Anderson-Moreton'
    },
    {
      title: 'Web System',
      description:
        'Responsive web system focused on usability and best development practices.',
      image: 'assets/img/profileRepository.png',
      link: 'https://github.com/Anderson-Moreton'
    }
  ];

}
