import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, NavbarComponent],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  // Sidebar toggle
  sidebarActive = false;

  // Form data
  firstName = '';
  lastName = '';
  email = '';
  hobby = '';
  topic = '';
  messageText = '';
  showOnHome = false;

  // Image upload
  imageFile: File | null = null;

  private isValidEmail(email: string): boolean{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  // Template element references
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('cardIcon') cardIcon!: ElementRef<HTMLElement>;

  // Inject HttpClient
  constructor(private messageService: MessageService) {}

  // Handle file input change
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.imageFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      // Show preview image
      this.imagePreview.nativeElement.src = reader.result as string;
      // Hide icon
      this.cardIcon.nativeElement.style.display = 'none';
    };
    reader.readAsDataURL(this.imageFile);
  }

  // Submit form
  submitForm(): void {

    if (!this.isValidEmail(this.email)) {
      alert('Please enter a valid email address');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.firstName.trim());
    formData.append('lastName', this.lastName.trim());
    formData.append('email', this.email.trim());
    formData.append('hobby', this.hobby);
    formData.append('topic', this.topic);
    formData.append('message', this.messageText.trim());
    formData.append('showOnHome', String(this.showOnHome ? '1' : '0'));

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    // Use the service (correct architecture)
    this.messageService.sendMessage(formData).subscribe({
      next: (response) => {
        console.log('Message sent:', response);
        alert('Message sent successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error sending message:', error);
        alert('Failed to send message.');
      }
    });
  }

  // Reset form fields and image preview
  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.hobby = '';
    this.topic = '';
    this.messageText = '';
    this.showOnHome = false;
    this.imageFile = null;

    if (this.imagePreview && this.cardIcon) {
      this.imagePreview.nativeElement.src = '';
      this.cardIcon.nativeElement.style.display = 'block';
    }
  }
}