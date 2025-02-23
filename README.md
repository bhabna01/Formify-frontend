# Formify - Modern Form Builder Platform

[![Project Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A full-stack form building solution with advanced features like template management, user roles, and response analytics. Create, share, and analyze forms effortlessly.

**🌐 Live Demo**: [formify.app](https://formify-frontend-theta.vercel.app/)  
**⚙️ Backend Repository**: [formify-backend](https://github.com/bhabna01/Formify-backend)

## Features

- 🛠️ Drag-and-drop form builder
- 👥 Role-based access control (Admin/User)
- 🔐 JWT authentication system
- 📦 Template marketplace with search/tag filtering
- 📊 Response analytics dashboard
- 🌐 Multi-language support (i18n)
- 🔍 Full-text search across templates
- 🏷️ Tag management system
- 📦 RESTful API with Prisma ORM

## Technology Stack

### Frontend

- React 19 + Vite
- Tailwind CSS
- React Query (TanStack)
- React Hook Form
- i18next (Internationalization)
- SweetAlert2

### Backend

- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt password hashing
- CORS middleware

### Database

- PostgreSQL with full-text search
- Automated migrations
- Relational modeling (Users, Templates, Forms, Tags)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- npm 9+

### Installation

#### Backend Setup

# Clone repository

git clone https://github.com/bhabna01/Formify-backend
cd formify-backend

# Install dependencies

npm install

# Configure environment variables

cp .env.example .env

# Edit .env with your credentials

# Database setup

npx prisma migrate dev
npx prisma generate

# Start server

npm run dev

#### Frontend Setup

# Clone frontend repository

git clone https://github.com/bhabna01/Formify-frontend
cd formify-frontend

# Install dependencies

npm install

# Start development server

npm run dev

#### Environment Variables

Backend .env requirements:

DATABASE_URL="postgresql://user:password@localhost:5432/formify?schema=public"
ACCESS_TOKEN_SECRET=your_jwt_secret_here
PORT=5000

#### API Reference

Key endpoints:

    POST /templates - Create new form template (Admin only)

    GET /template/search?query=... - Full-text template search

    GET /forms/template/:templateId - Get form responses

    PATCH /users/block/:userId - Block user (Admin)

    GET /tags - Get all tags with usage count

### Deployment

Recommended services:

    Frontend: Vercel/Netlify

    Backend: Render/Railway

    Database: NeonConsole/Amazon RDS

## License

Distributed under the MIT License. See LICENSE for more information.
