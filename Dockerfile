# Use official Node.js image as a base image
FROM node:18

# Set working directory
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 5000 for the backend service
EXPOSE 5000

# Command to run the app
CMD ["npm", "start"]
