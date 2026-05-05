# Use Node.js 18 Alpine for smaller image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies for backend
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Copy backend source
COPY backend/ ./backend/

# Copy frontend and build it
COPY gearlink-react/ ./gearlink-react/
RUN cd gearlink-react && npm ci && npm run build

# Copy built frontend to backend public
RUN cp -r gearlink-react/dist backend/public

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "backend/server.js"]