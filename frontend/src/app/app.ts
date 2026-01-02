import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,           // necessário para imports aqui
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']    // corrigido de styleUrl para styleUrls
})
export class App {
  protected readonly title = signal('personal-website');
}
