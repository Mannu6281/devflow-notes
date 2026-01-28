# DevFlow Notes

DevFlow Notes is a full-stack web application that helps developers organize projects and development notes, and generate clear, structured project explanations using AI.

It is designed to support workflows such as hackathons, project documentation, and idea organization by combining CRUD-based project management with AI-assisted summarization.

---

## Features

- Create, view, update, and delete projects
- Add and manage notes under individual projects
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
- Google Gemini API

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Project Structure

``` 
devflow-notes/
├── backend/
│   ├── server.js         
│   ├── config/
│   │   └── Db.js         
│   ├── models/
│   │   ├── Project.js       
│   │   └── Note.js         
│   ├── controllers/
│   │   ├── ProjectController.js
│   │   ├── NoteController.js
│   │   └── AiController.js
│   ├── routes/
│   │   ├── ProjectRoutes.js
│   │   ├── NoteRoutes.js
│   │   └── AiRoutes.js
│   │
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public/
│
└── README.md

```
--- 

## API Endpoints

### Projects
- `GET /api/projects`  
  Fetch all projects

- `POST /api/projects`  
  Create a new project

- `GET /api/projects/:id`  
  Fetch a single project

- `PUT /api/projects/:id`  
  Update a project

- `DELETE /api/projects/:id`  
  Delete a project and its associated notes

---

### Notes
- `GET /api/notes/:projectId`  
  Fetch notes for a project

- `POST /api/notes`  
  Add a new note

- `PUT /api/notes/:projectId/:noteId`  
  Update a note

- `DELETE /api/notes/:projectId/:noteId`  
  Delete a note

---

### AI Explanation Generation
- `POST /api/ai/generate`

Generates a structured, markdown-formatted explanation of a project using:
- Project details (title, problem, target users, tech stack)
- Recent development notes
- Google Gemini generative AI

The output is formatted for use in hackathon submissions or project presentations.

---

## Environment Variables

### Backend (`.env`)
PORT=5000

MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key


### Frontend (`.env`)
VITE_API_URL=your_backend_base_url


---

## What This Project Demonstrates

- Designing RESTful APIs with Express
- MongoDB data modeling using Mongoose
- Handling relational data using document references
- Integrating third-party AI services into backend workflows
- Managing CORS and environment-specific configurations
- Deploying full-stack applications using Render and Vercel
- Understanding end-to-end request flow between frontend, backend, database, and AI services

---

## Future Improvements

- User authentication and authorization
- Input validation and rate limiting
- AI prompt customization controls
- Improved error handling and logging
- UI/UX enhancements

---

## Author

**Mannu Nandan Jha**  
GitHub: https://github.com/Mannu6281  
LinkedIn: https://www.linkedin.com/in/mannu-nandan-jha-a05567317
