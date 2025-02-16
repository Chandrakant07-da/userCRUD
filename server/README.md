```# 🛠️ Backend - User Management API

## **📌 Overview**
The backend is built with **Node.js, Express, MongoDB, and Redis**, providing a **scalable** API for managing users.

---

## **📌 Features**
✅ RESTful API with CRUD operations  
✅ **MongoDB Atlas** for database storage  
✅ **Redis Caching** for faster responses  
✅ **Dockerized** for containerization  

---

## **📌 Setup**

### **🔹 1️⃣ Install Dependencies**
sh
cd server
npm install
🔹 2️⃣ Configure Environment Variables
Create a .env file:

sh
PORT=5000
MONGO_URI=mongodb+srv://youruser:password@cluster.mongodb.net/mydb
REDIS_HOST=localhost
🔹 3️⃣ Start the Server
sh
npm run dev
API runs on http://localhost:5000
📌 API Endpoints
Method	Endpoint	Description
GET	/api/users	Fetch all users
POST	/api/users	Create a new user
PUT	/api/users/:id	Update a user
DELETE	/api/users/:id	Delete a user
📌 Running with Docker

🔹 1️⃣ Build and Run the Docker Container

docker build -t user-backend .
docker run -p 5000:5000 user-backend
📌 Scalability
Redis Caching → Reduces database load
MongoDB Indexing → Optimizes queries
Horizontal Scaling → Works with Node.js Clustering
```