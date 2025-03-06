MyTask

A full-stack task management application built with React, TypeScript, Tailwind CSS, Node.js, Express.js, and Prisma.



📌 Features

✅ User Authentication (Signup/Login)

📌 Create, Update, Delete Tasks

📊 Task Filtering and Sorting

🌟 Responsive UI with Tailwind CSS

⚡ Fast API with Express.js & Prisma

🛠️ Tech Stack

Frontend

⚛️ React with TypeScript

🎨 Tailwind CSS for Styling

🔄 Vite for Fast Development

Backend

🏗️ Node.js with Express.js

🛢️ Prisma ORM with PostgreSQL

🔐 JWT Authentication

🌐 CORS and Body Parser Middleware

📂 Folder Structure

/mytask
│── /frontend   # React + Vite frontend
│── /backend    # Express.js backend
│── README.md   # Project documentation

📦 Installation & Setup

1. Clone the Repository

git clone https://github.com/jagdishsinghboura/mytask.git
cd mytask

2. Setup Backend

cd backend
npm install
cp .env.example .env   # Configure environment variables
npx prisma migrate dev  # Run database migrations
npm run dev  # Start backend server

3. Setup Frontend

cd ../frontend
npm install
cp .env.example .env   # Configure API URL
npm run dev  # Start frontend server




📜 License

This project is licensed under the MIT License.

Made with ❤️ by Jagdish Singh Boura

