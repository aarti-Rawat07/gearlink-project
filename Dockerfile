# Use Node.js 18 Alpine
FROM node:18-alpine

WORKDIR /app

# Backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Backend source
COPY backend ./backend

# Frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Frontend source
COPY frontend ./frontend

# Build frontend
RUN cd frontend && npm run build

# Copy build to backend/public
RUN mkdir -p backend/public && cp -r frontend/dist/* backend/public/

EXPOSE 5000

CMD ["node", "backend/server.js"]