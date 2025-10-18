// Weather App Frontend JavaScript
// This script handles the frontend logic for the weather app

// Get DOM elements
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherResult = document.getElementById('weatherResult');
const loading = document.getElementById('loading');
const weatherContent = document.getElementById('weatherContent');

// Backend API URL - using localhost for direct testing
const API_BASE_URL = 'http://localhost:5000';

// Function to get weather data
async function getWeather() {
    const city = cityInput.value.trim();
    
    // Validate input
    if (!city) {
        showError('Please enter a city name!');
        return;
    }
    
    // Show loading state
    showLoading();
    
    try {
        // Make API call to backend
        const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const weatherData = await response.json();
        
        // Display weather data
        displayWeather(weatherData);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(`Failed to get weather data: ${error.message}`);
    }
}

// Function to display weather data
function displayWeather(data) {
    let additionalInfo = '';
    
    // Add additional weather info if available (from real API)
    if (data.humidity || data.windSpeed || data.description) {
        additionalInfo = `
            <div class="additional-info" style="margin-top: 15px; font-size: 0.9em; opacity: 0.8;">
                ${data.description ? `<div>${data.description}</div>` : ''}
                ${data.humidity ? `<div>Humidity: ${data.humidity}</div>` : ''}
                ${data.windSpeed ? `<div>Wind: ${data.windSpeed}</div>` : ''}
            </div>
        `;
    }
    
    weatherContent.innerHTML = `
        <div class="city-name">${data.city}</div>
        <div class="temperature">${data.temperature}</div>
        <div class="condition">${data.condition}</div>
        ${additionalInfo}
    `;
    
    // Show the weather result with animation
    weatherResult.classList.add('show');
    
    // Hide loading
    loading.style.display = 'none';
    weatherContent.style.display = 'block';
    
    // Re-enable button
    resetButton();
}

// Function to show loading state
function showLoading() {
    loading.style.display = 'block';
    weatherContent.style.display = 'none';
    weatherResult.classList.remove('show');
    getWeatherBtn.disabled = true;
    getWeatherBtn.textContent = 'Loading...';
}

// Function to show error message
function showError(message) {
    weatherContent.innerHTML = `
        <div class="error">
            <strong>Error:</strong> ${message}
        </div>
    `;
    
    // Show the weather result with animation
    weatherResult.classList.add('show');
    
    // Hide loading
    loading.style.display = 'none';
    weatherContent.style.display = 'block';
    
    // Re-enable button
    resetButton();
}

// Function to reset button state
function resetButton() {
    getWeatherBtn.disabled = false;
    getWeatherBtn.textContent = 'Get Weather';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Allow Enter key to trigger weather fetch
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });
    
    // Reset button state when input changes
    cityInput.addEventListener('input', function() {
        if (getWeatherBtn.disabled) {
            resetButton();
        }
    });
    
    // Initial state
    resetButton();
});

// Make getWeather function globally available
window.getWeather = getWeather;