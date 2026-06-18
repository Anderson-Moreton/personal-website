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
        'OPA Delivery App is a food delivery platform designed to simulate a real-world e-commerce application for restaurants and fast-food businesses. The system includes user authentication, product and category management, shopping cart functionality, order tracking, and an administrative panel for managing orders and updating their status. The project was built using Angular, TypeScript, Node.js, Express, MySQL, and Docker, following a REST API architecture.',
      image: 'assets/img/opaDeliveryApp.PNG',
      link: 'https://github.com/Anderson-Moreton/opa-delivery-app',
    },
    {
      title: 'Project under development ',
      description: 'The project is still in progress. More details will be available soon.',
      image: 'assets/img/profileRepository.png',
      link: 'https://github.com/Anderson-Moreton',
    },
    {
      title: 'Project under development ',
      description: 'The project is still in progress. More details will be available soon.',
      image: 'assets/img/profileRepository.png',
      link: 'https://github.com/Anderson-Moreton',
    },
  ];
}
