import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    NavbarComponent
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

  constructor(private contactService: ContactService) {}

  submitForm(): void {

    // Required fields validation
    if (
      !this.firstName.trim() ||
      !this.lastName.trim() ||
      !this.email.trim() ||
      !this.messageText.trim()
    ) {
      alert('Please fill in all fields.');
      return;
    }

    // Email validation
    if (!this.isValidEmail(this.email)) {
      alert('Please enter a valid email address.');
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
        alert('Your message was sent successfully!');
        this.resetForm();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error sending contact message:', error);
        alert('Failed to send message. Please try again later.');
        this.loading = false;
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