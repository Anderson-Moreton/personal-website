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
        'Modern Full Stack food delivery application built with Angular, TypeScript, Node.js, Express, MySQL, and Docker. Features JWT authentication, shopping cart, stripe API, order management, and an admin dashboard.',
      image: 'assets/img/opaDelivery.PNG',
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
