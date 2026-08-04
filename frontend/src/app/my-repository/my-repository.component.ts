import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-repository',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-repository.component.html',
  styleUrls: ['./my-repository.component.css'],
})
export class MyRepositoryComponent {
  sidebarActive = false;

  projects = [
    {
      title: 'OPA Delivery App',
      description:
        'A modern Full Stack food delivery application developed with Angular and TypeScript, emphasizing component-based architecture, REST API integration, and responsive user experience. The project includes secure JWT authentication, shopping cart, order management, real-time order tracking, and an administrative dashboard. Built with Node.js, Express, MySQL, and Docker, following modern web development best practices.',
      image: 'assets/img/opaDeliveryApp.PNG',
      link: 'https://opa-delivery-app.vercel.app/',
      external: true,
    },
    {
      title: 'Project under development ',
      description: 'The project is still in progress. More details will be available soon.',
      image: 'assets/img/profileRepository.png',
      link: 'coming-soon',
      external: false,
    },
    {
      title: 'Project under development ',
      description: 'The project is still in progress. More details will be available soon.',
      image: 'assets/img/profileRepository.png',
      link: '/coming-soon',
      external: false,
    },
  ];
}
