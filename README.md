# DevFlow Notes

DevFlow Notes is a full-stack web application that helps developers organize projects and development notes, and generate clear, structured project explanations using AI.

It is designed to support workflows such as hackathons, project documentation, and idea organization by combining CRUD-based project management with AI-assisted summarization.

---

## Features
- User Authentication & Authorization (JWT-based)
- Create, view, update, and delete projects
- Add and manage notes under individual projects
- Protected routes to ensure data privacy per user
- RESTful API architecture for projects and notes
- AI-powered project explanation generation using Google Gemini
- Responsive frontend built with React
- Environment-based configuration for development and production
- Deployed frontend and backend on cloud platforms

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Google Gemini API

### Deployment
- Frontend: Vercel
- Backend: Render

---

### Authentication System

- JWT-based authentication
- Secure password hashing
- Protected API routes using middleware
- User-specific access to projects and notes
- Token-based authorization via Authorization: Bearer <token>
- This ensures each user can only access and modify their own data.

---

## Project Structure

``` 
devflow-notes/
├── backend/
│   ├── config/
│   │   └── Db.js
│   │
│   ├── controllers/
│   │   ├── AiController.js
│   │   ├── AuthController.js
│   │   ├── NoteController.js
│   │   └── ProjectController.js
│   │
│   ├── middleware/
│   │   └── AuthMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Note.js
│   │
│   ├── routes/
│   │   ├── AiRoutes.js
│   │   ├── AuthRoutes.js
│   │   ├── NoteRoutes.js
│   │   └── ProjectRoutes.js
│   │
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   └── NotePage.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
└── README.md


```
--- 

## 🔌 API Endpoints

> 🔐 All project, note, and AI routes require authentication  
> Include header: `Authorization: Bearer <JWT_TOKEN>`

---

### 🔐 Authentication

- `POST /api/auth/register`  
  Register a new user

- `POST /api/auth/login`  
  Authenticate user and receive a JWT token

---

### 📁 Projects (Protected)

- `GET /api/projects`  
  Fetch all projects belonging to the authenticated user

- `POST /api/projects`  
  Create a new project

- `GET /api/projects/:id`  
  Fetch a single project by ID

- `PUT /api/projects/:id`  
  Update an existing project

- `DELETE /api/projects/:id`  
  Delete a project and its associated notes

---

### 📝 Notes (Protected)

- `GET /api/notes/:projectId`  
  Fetch all notes for a project

- `GET /api/notes/:projectId/:noteId`  
  Fetch a single note

- `POST /api/notes/:projectId`  
  Add a new note to a project

- `PUT /api/notes/:projectId/:noteId`  
  Update an existing note

- `DELETE /api/notes/:projectId/:noteId`  
  Delete a note

---

### 🤖 AI Explanation Generation (Protected)

- `POST /api/ai/generate`  

Generate a structured, markdown-formatted project explanation using:
- Project details
- Development notes
- Google Gemini Generative AI

The output is formatted for use in hackathon submissions or project presentations.

---

## Environment Variables

### Backend (`.env`)
PORT=5000

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key


### Frontend (`.env`)
VITE_API_URL=your_backend_base_url


---

## What This Project Demonstrates

- JWT-based authentication & route protection
- Secure backend architecture with middleware
- RESTful API design using Express
- MongoDB relational modeling with Mongoose
- AI integration in real backend workflows
- Environment-based configs & deployment
- Full end-to-end ownership of a production-style app

---

## Future Improvements

- Refresh token implementation
- Role-based access control (RBAC)
- Rate limiting & security hardening
- AI prompt customization
- Export AI explanations (PDF / Markdown)
- Better logging & monitoring

---

## Author

**Mannu Nandan Jha**  
GitHub: https://github.com/Mannu6281  
LinkedIn: https://www.linkedin.com/in/mannu-nandan-jha-a05567317
