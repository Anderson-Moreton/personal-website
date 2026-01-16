import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestimonialService } from '../services/testimonials.service';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent {

  @Output() close = new EventEmitter<void>();

  firstName = '';
  lastName = '';
  messageText = '';
  imageFile: File | null = null;

  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('cardIcon') cardIcon!: ElementRef<HTMLElement>;

  constructor(private testimonialService: TestimonialService) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.imageFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.nativeElement.src = reader.result as string;
      this.cardIcon.nativeElement.style.display = 'none';
    };
    reader.readAsDataURL(this.imageFile);
  }

  submit(): void {
    if (
      !this.firstName.trim() ||
      !this.lastName.trim() ||
      !this.messageText.trim()
    ) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.firstName.trim());
    formData.append('lastName', this.lastName.trim());
    formData.append('message', this.messageText.trim());

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.testimonialService.sendTestimonial(formData).subscribe({
      next: () => {
        alert('Thank you for your testimonial!');
        this.close.emit();
      },
      error: () => alert('Failed to send testimonial')
    });
  }

  cancel(): void {
    this.close.emit();
  }
}