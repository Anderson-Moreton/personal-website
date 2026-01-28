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
      title: 'Project under development',
      description:
        'The project is still in progress. More details will be available soon.',
      image: 'assets/img/profileRepository.png',
      link: 'https://github.com/Anderson-Moreton'
    },
    {
      title: 'Project under development ',
      description:
        'The project is still in progress. More details will be available soon.',
      image: 'assets/img/profileRepository.png',
      link: 'https://github.com/Anderson-Moreton'
    },
    {
      title: 'Project under development ',
      description:
        'The project is still in progress. More details will be available soon.',
      image: 'assets/img/profileRepository.png',
      link: 'https://github.com/Anderson-Moreton'
    }
  ];

}
