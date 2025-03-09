MyTask
MyTask is a full-stack task management application built using React, TypeScript, Tailwind CSS, Express.js, and Prisma ORM. The project allows users to manage their daily tasks efficiently.

Features
User Authentication (Sign Up / Sign In)

Task Management (Add, Edit, Delete Tasks)

Task Filtering and Sorting

Secure Token-based Authentication

Interactive UI with Tailwind CSS

Robust Backend with Express.js and Prisma ORM

Tech Stack
Frontend: React (TypeScript), Tailwind CSS

Backend: Express.js (TypeScript), Prisma ORM

Database: PostgreSQL (via Prisma)

Deployment: Vercel

Project Structure
mytask/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.ts
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
├── .env
├── .gitignore
├── README.md
└── vercel.json
Installation
Clone the Repository:

git clone https://github.com/jagdishsinghboura/mytask.git
cd mytask
Install Dependencies:

cd backend
npm install
cd ../frontend
npm install
Setup Environment Variables: Create a .env file in both backend/ and frontend/ folders with the following details:

Backend (.env)

DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret_key
PORT=8080
Frontend (.env)

VITE_API_URL=http://localhost:8080/api/v1
Run Prisma Migration:

cd backend
npx prisma migrate dev
Run the Project:

Backend:

npm run dev
Frontend:

npm run dev
Deployment
The project is deployed on Vercel. Follow these steps to deploy:

Push the code to GitHub.

Import the project into Vercel.

Add environment variables in Vercel settings.

Deploy the project.

API Endpoints
User Routes
POST /api/v1/user/sign-up - Register a new user

POST /api/v1/user/sign-in - User login

Task Routes
GET /api/v1/task/all - Fetch all tasks

POST /api/v1/task/add - Add a new task

PUT /api/v1/task/:taskId - Update a task

DELETE /api/v1/task/:taskId - Delete a task

Contribution
Contributions are welcome! Follow these steps to contribute:

Fork the repository.

Create a new branch.

Commit your changes.

Push the branch and create a Pull Request.

License
This project is licensed under the MIT License.
