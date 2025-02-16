# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Build frontend
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start frontend server
CMD ["npm", "start"]
