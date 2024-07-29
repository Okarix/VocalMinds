# Stage 1: Build stage
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Production stage
FROM node:18-slim

WORKDIR /app

# Copy built files and package.json from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose port 3000 for the application
EXPOSE 3000

# Command to run the application
CMD ["node", "./dist/index.js"]