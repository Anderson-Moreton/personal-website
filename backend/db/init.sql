-- ============================
-- FORCE DATABASE CREATION
-- ============================
CREATE DATABASE IF NOT EXISTS personal_website
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE personal_website;

-- ============================
-- ADMINS TABLE
-- ============================
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- TESTIMONIALS TABLE
-- ============================
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  image_url VARCHAR(255),
  approved TINYINT(1) NOT NULL DEFAULT 0,
  show_on_home TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- TESTIMONIAL LIKES TABLE
-- ============================
CREATE TABLE IF NOT EXISTS testimonial_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  testimonial_id INT NOT NULL,
  visitor_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_like (testimonial_id, visitor_id),
  CONSTRAINT fk_testimonial
    FOREIGN KEY (testimonial_id)
    REFERENCES testimonials(id)
    ON DELETE CASCADE
);

-- ============================
-- DEFAULT ADMIN (ONE TIME)
-- ============================
INSERT IGNORE INTO admins (email, password)
VALUES (
  'anderson.moreton@gmail.com',
  '$2b$10$JVEZfyi6gC5IJ5w4ShhN.u4jvha/odO959KaH6CYGDVLcMlF6fd9O'
);