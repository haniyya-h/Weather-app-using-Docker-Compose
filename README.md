# 🌤️ Weather App - Docker Learning Project

A simple full-stack weather application built with Docker Compose to demonstrate containerization concepts and multi-service orchestration.

## 📋 Project Overview

This project demonstrates:
- **Backend API** (Node.js + Express) providing weather data
- **Frontend** (HTML/CSS/JavaScript) with beautiful UI
- **Docker containers** for both services
- **Docker Compose** for orchestration
- **Service communication** between containers

## 🏗️ Project Structure

```
weather-app/
├── backend/
│   ├── Dockerfile          # Backend container configuration
│   ├── package.json        # Node.js dependencies
│   └── server.js           # Express API server
├── frontend/
│   ├── Dockerfile          # Frontend container configuration
│   ├── index.html          # Main HTML page
│   └── script.js           # Frontend JavaScript
├── docker-compose.yml      # Multi-container orchestration
├── .dockerignore           # Docker build optimization
└── README.md              # This documentation
```

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Docker Compose (usually comes with Docker Desktop)

### Running the Application

1. **Navigate to the project directory:**
   ```bash
   cd weather-app
   ```

2. **Build and start all services:**
   ```bash
   docker compose up --build
   ```

3. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5000

4. **Stop the application:**
   ```bash
   docker compose down
   ```

## 🔧 Services Overview

### Backend Service (`backend`)
- **Technology:** Node.js + Express
- **Port:** 5000
- **Purpose:** Provides weather API endpoints
- **Key Features:**
  - GET `/weather?city=CityName` - Returns weather data
  - GET `/health` - Health check endpoint
  - CORS enabled for frontend communication
  - Real-time weather data from OpenWeatherMap API with fallback to mock data

### Frontend Service (`frontend`)
- **Technology:** HTML + JavaScript + Nginx
- **Port:** 3000 (mapped from container port 80)
- **Purpose:** User interface for the weather app
- **Key Features:**
  - Beautiful responsive design
  - City input with weather display
  - Communicates with backend via service name

## 🌐 API Endpoints

### Weather Endpoint
```
GET /weather?city=Islamabad
```

**Response:**
```json
{
  "city": "Islamabad",
  "temperature": "27°C",
  "condition": "Sunny"
}
```

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Weather API is running!",
  "timestamp": "2025-10-18T11:30:00.000Z"
}
```

## 🐳 Docker Concepts Demonstrated

1. **Multi-container Application:** Two services working together
2. **Service Communication:** Frontend calls backend using service name
3. **Networks:** Custom bridge network for service isolation
4. **Port Mapping:** Host ports mapped to container ports
5. **Build Context:** Each service has its own Dockerfile
6. **Dependencies:** Frontend waits for backend to start

## 🎯 Learning Objectives

- **Docker Compose:** Orchestrating multiple containers
- **Service Discovery:** How containers find each other
- **Networking:** Container-to-container communication
- **Port Mapping:** Exposing services to host
- **Build Optimization:** Efficient Dockerfile design

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the ports
   netstat -an | findstr :3000
   netstat -an | findstr :5000
   ```

2. **Container won't start:**
   ```bash
   # Check logs
   docker compose logs backend
   docker compose logs frontend
   ```

3. **Frontend can't reach backend:**
   - Ensure both services are running
   - Check that backend is accessible
   - Verify network connectivity

### Useful Commands

```bash
# View running containers
docker compose ps

# View logs for specific service
docker compose logs backend
docker compose logs frontend

# Rebuild specific service
docker compose up --build backend

# Stop and remove everything
docker compose down --volumes --remove-orphans

# Clean up Docker system
docker system prune -a
```

## 🎨 Features

- **Responsive Design:** Works on desktop and mobile
- **Error Handling:** Graceful error messages
- **Loading States:** Visual feedback during API calls
- **Real-time Data:** OpenWeatherMap API integration with smart fallback
- **Modern UI:** Beautiful gradient design with animations
- **Service Communication:** Frontend-backend integration

## 📸 Screenshots

### Application Running

<img width="555" height="721" alt="image" src="https://github.com/user-attachments/assets/f8529efe-3bc2-4aa9-8726-9bb5e50fcbb0" />


## 📚 Docker Learning Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## 🤝 Contributing

This is a learning project. Feel free to:
- Fork the repository
- Add new features
- Improve the UI/UX
- Add more weather data
- Implement real weather API integration

## 📄 License

This project is created for educational purposes as part of a Docker learning exercise.

---

**Happy Learning! 🎉**

Built with ❤️ for Docker education
