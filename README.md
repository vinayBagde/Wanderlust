# 🌍 Wanderlust - Find, list, and review travel stays all in one place.!
_Wanderlust is a full-stack web application for exploring and managing travel listings, built using Node.js, Express.js, MongoDB, and EJS, with Cloudinary for image handling._

---

| _Desktop Preview_                                   |
| ----------------------------------------------------------- |
| ![Desktop](/public/img/homePage.png)      |

---
## 📑 Table of Contents

- [📖 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Installation & Setup](#-installation--setup)
- [🎥 Live Demo](#-live-demo)
- [👤 Author & Contact](#-author--contact)

---

## 📖 Overview

   Wanderlust is a full-stack web application designed for exploring and managing travel listings. Users can browse destinations, create and manage listings, and upload images with ease.

   The application follows the MVC architecture and is built using Node.js, Express.js, MongoDB, and EJS, with Cloudinary integration for image storage. It provides a smooth and dynamic user experience through server-side rendering and structured backend logic.

---

## ✨ Features

   - User authentication system with signup and login functionality  
   - Users can create new travel listings  
   - Only the listing owner can edit and delete their listings  
   - Users can add reviews with ratings and comments on listings  
   - Only the review author can delete their reviews  
   - Integrated map feature to display listing locations  



---

## 🛠️ Tech Stack

   Frontend: EJS (Embedded JavaScript Templates), Bootstrap, Google Fonts, and Font Awesome

   Backend: Node.js and Express.js

   Database: MongoDB Atlas

   Libraries & Frameworks: Joi for form validation, Passport for authentication, Cloudinary for image upload and storage, and Leaflet for map integration

   Tools: Render for deployment, and Git & GitHub for version control
   
---

## 📂 Project Structure

```
## 📂 Project Structure

WANDERLUST/
├── controllers/                # Handles core application logic (MVC Controller)
│   ├── listing.js              # CRUD operations for listings
│   ├── reviews.js              # Create/delete reviews & ratings
│   └── users.js                # User authentication and management
│
├── models/                     # Defines MongoDB schemas (MVC Model)
│   ├── listing.js              # Listing data structure
│   ├── review.js               # Review data structure
│   └── user.js                 # User schema with authentication
│
├── routes/                     # Connects routes to controllers
│   ├── listing.js              # Routes for listing features
│   ├── review.js               # Routes for review system
│   └── user.js                 # Routes for login/signup
│
├── views/                      # EJS templates (MVC View layer)
│   ├── includes/               # Reusable UI components
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   │
│   ├── layouts/                # Base layout template
│   │   └── boilerplate.ejs
│   │
│   ├── listings/               # Listing-related pages
│   │   ├── index.ejs           # Display all listings
│   │   ├── show.ejs            # Show single listing details
│   │   ├── new.ejs             # Create listing form
│   │   ├── edit.ejs            # Edit listing form
│   │   └── error.ejs           # Error handling UI
│   │
│   └── users/                  # Authentication pages
│       ├── login.ejs
│       └── signup.ejs
│
├── public/                     # Static assets (CSS, JS)
│   ├── css/
│   └── js/
│
├── utils/                      # Helper utilities
│   ├── expressError.js         # Custom error handling class
│   └── wrapAsync.js            # Async error wrapper
│
├── init/                       # Database seeding & initialization
│   ├── data.js
│   ├── sampleData.js
│   └── index.js
│
├── middleware.js               # Custom middleware (validation)
├── cloudConfig.js              # Cloudinary configuration
├── schema.js                   # Joi validation schemas
├── app.js                      # Main server entry point
│
├── .env                        # Environment variables
├── .gitignore
├── package.json                # Project dependencies & scripts
├── package-lock.json
└── README.md
```

---
## ⚙️ Installation & Setup

   Follow these steps to run the project locally:

   1. Clone the repository
      ```sh
      git clone https://github.com/vinayBagde/Wanderlust.git
      cd wanderlust
      ```

   2. Install dependencies
      ```sh
      npm install
      ```

   3. Setup environment variables

      Create a `.env` file in the root directory and add:
      ```sh
      ATLASDB_URL=your_mongodb_connection_string
      SECRET=your_session_secret
      CLOUD_NAME=your_cloudinary_name
      CLOUD_API_KEY=your_cloudinary_key
      CLOUD_API_SECRET=your_cloudinary_secret
      MAP_TOKEN=your_map_api_token
      ```

   4. Run the server
      ```sh
      node app.js
      ```

   5. Open in browser
      ```sh
      http://localhost:8080
      ```

---

## 🎥 Live Demo

   Wanderlust is deployed and accessible online. You can explore the application using the link below.

   https://wanderlust-cw2p.onrender.com/listings

---

## 👤 Author & Contact

💻 **Vinay Bagde**  
📧 Email: vinaybagde0@.com     
🔗 [GitHub](https://github.com/vinayBagde)        
💼 [LinkedIn](https://www.linkedin.com/in/vinay-bagde/)  








