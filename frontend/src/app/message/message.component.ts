import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

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

  // Image upload
  imageFile: File | null = null;

  // Template element references
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('cardIcon') cardIcon!: ElementRef<HTMLElement>;

  // Inject HttpClient
  constructor(private http: HttpClient) {}

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

  // Submit form to backend
  submitForm(): void {

    // Prepare form data
    const formData = new FormData();
    formData.append('firstName', this.firstName);
    formData.append('lastName', this.lastName);
    formData.append('email', this.email);
    formData.append('hobby', this.hobby);
    formData.append('topic', this.topic);
    formData.append('message', this.messageText);

    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    }

    // POST request to backend
    this.http.post('http://localhost:3000/messages', formData).subscribe({
      next: (res) => {
        console.log('Message sent:', res);
        alert('Message sent successfully!');
        this.resetForm(); // Reset form after successful submission
      },
      error: (err) => {
        console.error('Error sending message:', err);
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
    this.imageFile = null;

    if (this.imagePreview && this.cardIcon) {
      this.imagePreview.nativeElement.src = '';
      this.cardIcon.nativeElement.style.display = 'block';
    }
  }
}
