# SyncUp Realtime Feed Application

A full-stack realtime feed application built as part of the SyncUp Full Stack Developer assessment.

---

# Live Demo

## Frontend
https://your-vercel-url.vercel.app

## Backend API
https://syncup-assessment.onrender.com

---

# Tech Stack

## Frontend
- Next.js
- TypeScript
- Axios
- Socket.IO Client

## Backend
- Node.js
- Express.js
- Socket.IO
- PostgreSQL
- Redis

## Cloud Services
- Neon PostgreSQL
- Render
- Vercel

---

# Features

- Create realtime feed posts
- Fetch feeds from PostgreSQL
- Redis caching for GET `/feed`
- Socket.IO realtime updates
- Admin page to add feeds
- Automatic UI updates without refresh
- Cloud deployment support
- Realtime broadcasting across connected clients

---

# Project Structure

syncup-assessment/

├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── db.js
│   │   └── redis.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   └── app/
│   ├── package.json
│   └── .env.local
│
└── README.md

---

# Backend Setup

## Install Dependencies

```bash
npm install
Environment Variables

Create .env

PORT=5000

DATABASE_URL=your_neon_database_url

REDIS_URL=your_redis_url
Run Backend
npm run dev
Frontend Setup
Install Dependencies
npm install
Environment Variables

Create .env.local

NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com

NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.onrender.com
Run Frontend
npm run dev
API Endpoints
GET /feed

Fetch all feeds.

Response
[
  {
    "id": 1,
    "message": "Hello SyncUp",
    "created_at": "2026-05-19T10:00:00.000Z"
  }
]
POST /feed

Create new feed.

Request Body
{
  "message": "Realtime feed message"
}
Response
{
  "id": 2,
  "message": "Realtime feed message",
  "created_at": "2026-05-19T10:05:00.000Z"
}
Database Schema
CREATE TABLE IF NOT EXISTS feeds (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Redis Caching
GET /feed responses are cached using Redis
Cache invalidates automatically when new feed is added
Realtime Updates

Socket.IO is used for realtime communication.

When a new feed is created:

Data stored in PostgreSQL
Redis cache cleared
Socket.IO event emitted
All connected clients receive live update instantly
Deployment
Backend
Render
Frontend
Vercel
Database
Neon PostgreSQL
Cache
Redis Cloud
Production Environment Variables
Backend
DATABASE_URL=your_neon_pooler_url

REDIS_URL=your_redis_url
Frontend
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com

NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.onrender.com
Challenges Solved
PostgreSQL cloud connection issues
Redis cache integration
Socket.IO realtime deployment
Next.js production environment setup
Monorepo deployment structure
Render and Vercel deployment configuration
Author

K Gopala Krishna

Full Stack Developer Assessment Submission






