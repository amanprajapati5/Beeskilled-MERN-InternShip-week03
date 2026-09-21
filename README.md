# Full-Stack To-Do Application

A full-stack task management application built as part of the Beeskilled MERN Internship Week 3 project.

The application provides secure user authentication, personalized task management, CRUD operations, and image upload functionality with persistent storage.

## Project Overview

This project combines a React frontend with a Node.js/Express backend and MongoDB database.

Authenticated users can:

- Create tasks
- View their tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed or pending
- Upload images
- Preview images before uploading
- View previously uploaded images
- Access their data securely through JWT authentication

## Key Features

### 🔐 Authentication

- User registration
- User login
- Password hashing using bcryptjs
- JWT-based authentication
- Protected routes
- User-specific data access

### 📝 Task Management

- Create new tasks
- View personal tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Mark tasks as pending
- Task timestamps

### 🖼️ Image Upload

- Select images from the device
- Image preview before upload
- JPG, JPEG, PNG and WEBP support
- Maximum file size of 5MB
- Secure authenticated upload
- Images stored using Multer
- Image information stored in MongoDB
- Images associated with the logged-in user
- Uploaded images remain available after page refresh
- Multiple image uploads supported

## Technology Stack

### Frontend

- React
- JavaScript
- HTML
- CSS
- Vite
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Multer
- dotenv
- CORS
- Nodemon

## Project Architecture

```text
full-stack-todo-application/
│
├── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
│
└── user-auth-api/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── uploads/
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── server.js
    └── README.md
```

## Application Flow

```text
                 ┌──────────────────┐
                 │   React Frontend │
                 └────────┬─────────┘
                          │
                          │ HTTP Requests
                          │
                          ▼
                 ┌──────────────────┐
                 │ Express Backend  │
                 └────────┬─────────┘
                          │
                 ┌────────┴─────────┐
                 │                  │
                 ▼                  ▼
          ┌─────────────┐    ┌─────────────┐
          │ MongoDB     │    │  Multer     │
          │ Atlas       │    │ Image Store │
          └─────────────┘    └─────────────┘
```

## Authentication Flow

```text
Register
   ↓
Password hashed
   ↓
User stored in MongoDB
   ↓
Login
   ↓
JWT generated
   ↓
Token stored in frontend
   ↓
Token sent with protected requests
   ↓
Backend verifies JWT
   ↓
User-specific data returned
```

## Task Flow

```text
Create Task
     ↓
JWT Authentication
     ↓
Express API
     ↓
MongoDB
     ↓
Task linked to User
     ↓
Returned to React
     ↓
Displayed on Dashboard
```

## Image Upload Flow

```text
Select Image
     ↓
Client-side Validation
     ↓
Preview
     ↓
Upload with JWT
     ↓
Multer
     ↓
Image saved in uploads/
     ↓
Image information saved in MongoDB
     ↓
Image linked to User
     ↓
Displayed in Dashboard
```

## Security

The application uses several security mechanisms:

- Password hashing with bcryptjs
- JWT authentication
- Protected API routes
- User-specific database queries
- Environment variables for sensitive configuration
- File type validation
- File size validation
- `.env` excluded from Git

## API Overview

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
```

### Tasks

```text
POST   /api/tasks
GET    /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Images

```text
POST   /api/upload
GET    /api/upload
GET    /uploads/:filename
```

## Project Status

### Week 3 — Completed ✅

The Full-Stack To-Do Application currently includes:

- Authentication
- JWT authorization
- Task CRUD
- User-specific tasks
- Image upload
- Image persistence
- Responsive frontend
- MongoDB integration
- REST API

## Project Structure

The project is divided into two main parts:

**Frontend**

Responsible for the React user interface, dashboard, task management, authentication screens, and image upload interface.

**Backend**

Responsible for authentication, authorization, task APIs, image upload, database operations, and serving uploaded images.

For detailed information, see:

- `frontend/README.md`
- `user-auth-api/README.md`

## Internship Project

**Program:** Beeskilled MERN Internship
**Week:** 03
**Project:** Full-Stack To-Do Application
