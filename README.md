# Queue System Application

## Overview

This project is a queue management system that allows users to register, login, and manage a queue of requests using Redis for queuing and MongoDB for user management. It provides endpoints to add requests to a queue, process the next request, and get the queue size.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: Follow the [Docker installation guide](https://docs.docker.com/get-docker/) for your operating system.
- **Docker Compose**: This comes with Docker Desktop, or you can [install Docker Compose separately](https://docs.docker.com/compose/install/).

## Setup

### Environment Variables

Create a `.env` file in the root directory of your project with the following content:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/queue-system
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://redis:17930


Docker Configuration
Dockerfile: This file is used to build the Docker image for the backend service.
# Dockerfile
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 5000

# Start application
CMD [ "npm", "start" ]


docker-compose.yml: This file defines the services required for the application, including the backend, MongoDB, and Redis.

version: '3.8'

services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/queue-system
      - JWT_SECRET=your_jwt_secret
      - REDIS_URL=redis://redis:17930
    depends_on:
      - mongo
      - redis
    networks:
      - app-network

  mongo:
    image: mongo:latest
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network

  redis:
    image: redis:latest
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  mongo-data:


Running the Application
Build and start the Docker containers:
docker-compose up --build
The backend service will be available at http://localhost:5000.

API Endpoints
Authentication
POST /api/register: Register a new user.

Request Body: { "username": "user", "password": "pass" }
Response: { "success": true, "token": "JWT_TOKEN" }
POST /api/login: Login a user.

Request Body: { "username": "user", "password": "pass" }
Response: { "success": true, "token": "JWT_TOKEN" }
Queue Management
POST /api/queue/enqueue: Add a request to the queue.

Headers: Authorization: Bearer JWT_TOKEN
Request Body: { "data": "sample request data" }
Response: { "success": true, "message": "Request added to queue" }
GET /api/queue/process: Process the next request in the queue.

Headers: Authorization: Bearer JWT_TOKEN
Response: { "success": true, "request": { "data": "sample request data" } }
GET /api/queue/size: Get the size of the queue.

Headers: Authorization: Bearer JWT_TOKEN
Response: { "success": true, "length": 0 }



You can save this content in a file named `README.md` in your project directory.


