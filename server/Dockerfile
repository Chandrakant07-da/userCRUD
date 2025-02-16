# Use Node.js base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json first for caching dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Expose backend port (match your backend port)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
