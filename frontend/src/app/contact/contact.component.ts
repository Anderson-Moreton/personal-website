import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  // Sidebar toggle
  sidebarActive = false;

  // Form fields
  firstName = '';
  lastName = '';
  email = '';
  messageText = '';

  // UI state
  loading = false;

  constructor(
    private contactService: ContactService,
    private notificationService: NotificationService
  ) {}

  submitForm(form: NgForm): void {

  if (form.invalid) {
    this.notificationService.warning('Please fill in all fields.');
    return;
  }

  this.loading = true;

  const payload = {
    firstName: this.firstName.trim(),
    lastName: this.lastName.trim(),
    email: this.email.trim(),
    message: this.messageText.trim()
  };

  this.contactService.sendMessage(payload).subscribe({
    next: () => {
      this.loading = false;
      this.notificationService.success('Your message was sent successfully!');
      form.resetForm(); // 👈 limpa tudo corretamente
    },
    error: () => {
      this.loading = false;
      this.notificationService.error('Failed to send message.');
    }
  });
}

  private resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.messageText = '';
  }

  // Email validation helper
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }
}