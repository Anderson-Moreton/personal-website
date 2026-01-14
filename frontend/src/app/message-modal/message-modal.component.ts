import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent {

  @Output() close = new EventEmitter<void>();

  // Form data
  firstName = '';
  lastName = '';
  email = '';
  hobby = '';
  topic = '';
  messageText = '';
  showOnHome = true; // default true for testimonials
  // Image upload
  imageFile: File | null = null;

  // Template element references
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('cardIcon') cardIcon!: ElementRef<HTMLElement>;

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

  submit(): void {
    const formData = new FormData();
    formData.append('firstName', this.firstName.trim());
    formData.append('lastName', this.lastName.trim());
    formData.append('email', this.email.trim());
    formData.append('hobby', this.hobby);
    formData.append('topic', this.topic);
    formData.append('message', this.messageText.trim());
    formData.append('showOnHome', '1');

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.messageService.sendMessage(formData).subscribe({
      next: () => {
        alert('Thank you for your testimonial!');
        this.close.emit(); // fecha o modal
      },
      error: () => {
        alert('Failed to send message.');
      }
    });
  }

  cancel(): void {
    this.close.emit();
  }
}