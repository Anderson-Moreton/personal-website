import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

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

  // References to template elements
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('cardIcon') cardIcon!: ElementRef<HTMLElement>;

  // Handle file input change
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.imageFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      // Set the preview image
      this.imagePreview.nativeElement.src = reader.result as string;
      // Hide the icon
      this.cardIcon.nativeElement.style.display = 'none';
    };
    reader.readAsDataURL(this.imageFile);
  }

  // Submit form
  submitForm(): void {
    console.log({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      hobby: this.hobby,
      topic: this.topic,
      messageText: this.messageText,
      imageFile: this.imageFile
    });

    // Reset form (optional)
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.hobby = '';
    this.topic = '';
    this.messageText = '';
    this.imageFile = null;

    // Reset preview
    this.imagePreview.nativeElement.src = '';
    this.cardIcon.nativeElement.style.display = 'block';
  }
}