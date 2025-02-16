# 🎨 Frontend - User Management UI (Next.js + Tailwind CSS)

## **📌 Overview**
The frontend is built with **Next.js and Tailwind CSS**, providing a **modern, responsive UI** for managing users.

---

## **📌 Features**
✅ **Beautiful UI** built with **Tailwind CSS**  
✅ **Fully Responsive** and optimized for all devices  
✅ **Handles user CRUD operations** via backend API  

---

## **📌 Setup**

### **🔹 1️⃣ Install Dependencies**
```sh
cd frontend
npm install
```

🔹 2️⃣ Configure Environment Variables
Create .env.local:

env
NEXT_PUBLIC_API_URL=http://localhost:5000
🔹 3️⃣ Start the Development Server
```sh
npm run dev
Runs on http://localhost:3000
```
📌 Docker Setup
```sh
docker build -t user-frontend .
docker run -p 3000:3000 user-frontend
```
📌 Deployment to Vercel
Push code to GitHub
Go to Vercel → New Project
Select Repository
Set .env.local as Vercel environment variables:
env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
Click Deploy 🚀
Now, your frontend is live on Vercel! 🎉

yaml

---

## **📌 Final Summary**
✅ **`README.md` (Root)** → Explains **full project setup**  
✅ **`server/README.md`** → Explains **backend API**  
✅ **`frontend/README.md`** → Explains **frontend setup**  

Now, **your project has detailed documentation!** 🚀 Let me know if you need refinements.