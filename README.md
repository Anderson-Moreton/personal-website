🚀 Personal Portfolio – Full Stack Application

This project is a full stack personal portfolio website developed to practice, consolidate, and demonstrate modern web development skills.
It integrates frontend, backend, database, authentication, file upload, and deployment-ready architecture.

The application allows visitors to view information, leave testimonials, like testimonials, and send contact messages, while providing an admin panel to manage content.

* Features
* Public Area

One-page layout with smooth scrolling

Responsive design (desktop & mobile)

Testimonials section with:

Likes system

Optional user image

Limited number of visible testimonials on Home

Contact form with email delivery

Clean UI and smooth animations

* Admin Panel

Secure admin authentication (JWT)

Approve or reject testimonials

Control which testimonials appear on Home

Delete testimonials permanently

Manage content without touching the database

* Contact System

Contact form sends emails using NodeMailer

Frontend and backend validation

Secure environment variables

* Tech Stack
Frontend

Angular

Standalone Components

Angular Router

HTML5 / CSS3

Bootstrap Icons

Responsive layout

Backend

Node.js

Express.js

JWT Authentication

Multer (file upload)

Sharp (image resize & optimization)

NodeMailer (email service)

Database

MySQL

Relational data modeling

Likes system with relational integrity

* Database Structure (Main Tables)

testimonials

testimonial_likes

admins

* Security

JWT-based admin authentication

Protected admin routes

Environment variables for secrets

File type and size validation on uploads

* Image Handling

Image upload with Multer

Automatic resize and optimization using Sharp

File size limits

Only image MIME types allowed

* Validation

Frontend form validation

Backend validation for all inputs

Email format validation

Required field checks
