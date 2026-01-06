import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HomeService } from '../services/home.service';

export const homeResolver: ResolveFn<any[]> = () => {
  const homeService = inject(HomeService);
  return homeService.getHomeMessages();
};