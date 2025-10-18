const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenWeatherMap API configuration
const API_KEY = 'acca0d28dc792a5ae0977d928e71e935';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Fallback mock data for when API fails
const mockWeatherData = {
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

// Function to get real weather data from OpenWeatherMap API
function getRealWeatherData(city) {
  return new Promise((resolve, reject) => {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const weatherData = JSON.parse(data);
          
          if (weatherData.cod === 200) {
            // Success - return formatted weather data
            resolve({
              city: weatherData.name,
              temperature: `${Math.round(weatherData.main.temp)}°C`,
              condition: weatherData.weather[0].main,
              description: weatherData.weather[0].description,
              humidity: `${weatherData.main.humidity}%`,
              windSpeed: `${weatherData.wind.speed} m/s`
            });
          } else {
            // API error
            reject(new Error(weatherData.message || 'City not found'));
          }
        } catch (error) {
          reject(new Error('Failed to parse weather data'));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Weather endpoint with real API integration
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  
  if (!city) {
    return res.status(400).json({ 
      error: 'City parameter is required. Use: /weather?city=CityName' 
    });
  }

  try {
    // Try to get real weather data first
    const weatherData = await getRealWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    console.log(`API failed for ${city}, using fallback data:`, error.message);
    
    // Fallback to mock data if API fails
    const cityKey = city.toLowerCase().trim();
    
    if (mockWeatherData[cityKey]) {
      res.json(mockWeatherData[cityKey]);
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