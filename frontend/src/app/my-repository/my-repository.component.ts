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
        'Food delivery platform with authentication, shopping cart, order tracking and admin panel. Technologies: Angular • Node.js • Express • MySQL • Docker',
      image: 'assets/img/opaDeliveryApp.PNG',
      link: 'https://github.com/Anderson-Moreton/opa-delivery-app',
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
