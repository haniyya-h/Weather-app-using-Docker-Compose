const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock weather data for various cities
const weatherData = {
  'islamabad': { city: 'Islamabad', temperature: '27°C', condition: 'Sunny' },
  'karachi': { city: 'Karachi', temperature: '32°C', condition: 'Hot' },
  'lahore': { city: 'Lahore', temperature: '30°C', condition: 'Partly Cloudy' },
  'peshawar': { city: 'Peshawar', temperature: '25°C', condition: 'Clear' },
  'quetta': { city: 'Quetta', temperature: '18°C', condition: 'Cool' },
  'london': { city: 'London', temperature: '15°C', condition: 'Rainy' },
  'paris': { city: 'Paris', temperature: '20°C', condition: 'Cloudy' },
  'tokyo': { city: 'Tokyo', temperature: '22°C', condition: 'Sunny' },
  'new york': { city: 'New York', temperature: '12°C', condition: 'Windy' },
  'dubai': { city: 'Dubai', temperature: '35°C', condition: 'Hot' }
};

// Weather endpoint
app.get('/weather', (req, res) => {
  const city = req.query.city;
  
  if (!city) {
    return res.status(400).json({ 
      error: 'City parameter is required. Use: /weather?city=CityName' 
    });
  }

  // Convert to lowercase for case-insensitive lookup
  const cityKey = city.toLowerCase().trim();
  
  if (weatherData[cityKey]) {
    // Return weather data for the city
    res.json(weatherData[cityKey]);
  } else {
    // Generate random weather for unknown cities
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Windy', 'Clear', 'Foggy', 'Hot', 'Cool'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomTemp = Math.floor(Math.random() * 25) + 10; // 10-35°C
    
    res.json({
      city: city,
      temperature: `${randomTemp}°C`,
      condition: randomCondition
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Weather API is running!',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Weather API Server', 
    version: '1.0.0',
    endpoints: {
      weather: '/weather?city=CityName',
      health: '/health'
    }
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌤️  Weather API server running on port ${PORT}`);
  console.log(`📍 Available endpoints:`);
  console.log(`   - GET /weather?city=CityName`);
  console.log(`   - GET /health`);
  console.log(`   - GET /`);
});