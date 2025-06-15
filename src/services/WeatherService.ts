
export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  feelsLike: number;
  icon: string;
  location: string;
  lastUpdated: string;
}

export interface WeatherForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  description: string;
  icon: string;
  precipitation: number;
}

class WeatherService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
  
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
    
    try {
      // Using free OpenWeatherMap API - requires API key
      // For demo purposes, we'll simulate the API call
      const response = await this.simulateWeatherAPI(lat, lon);
      
      return {
        temperature: response.main.temp,
        description: response.weather[0].description,
        humidity: response.main.humidity,
        windSpeed: response.wind.speed,
        pressure: response.main.pressure,
        visibility: response.visibility / 1000, // Convert to km
        uvIndex: response.uvi || 0,
        feelsLike: response.main.feels_like,
        icon: response.weather[0].icon,
        location: response.name,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Weather API error:', error);
      // Return default weather data if API fails
      return this.getDefaultWeatherData(lat, lon);
    }
  }

  async getWeatherForecast(lat: number, lon: number): Promise<WeatherForecast[]> {
    try {
      // Simulate 5-day forecast
      const forecast: WeatherForecast[] = [];
      const today = new Date();
      
      for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        forecast.push({
          date: date.toISOString().split('T')[0],
          maxTemp: Math.round(20 + Math.random() * 15),
          minTemp: Math.round(10 + Math.random() * 10),
          description: ['Clear sky', 'Partly cloudy', 'Overcast', 'Light rain'][Math.floor(Math.random() * 4)],
          icon: ['01d', '02d', '04d', '10d'][Math.floor(Math.random() * 4)],
          precipitation: Math.round(Math.random() * 20)
        });
      }
      
      return forecast;
    } catch (error) {
      console.error('Weather forecast error:', error);
      return [];
    }
  }

  private async simulateWeatherAPI(lat: number, lon: number) {
    // Simulate realistic weather data based on South African climate
    const isCoastal = Math.abs(lat + 33.9) < 2; // Near Cape Town/Durban
    const baseTemp = isCoastal ? 22 : 18;
    const tempVariation = Math.random() * 10 - 5;
    
    return {
      main: {
        temp: Math.round(baseTemp + tempVariation),
        feels_like: Math.round(baseTemp + tempVariation + 2),
        humidity: Math.round(50 + Math.random() * 40),
        pressure: Math.round(1010 + Math.random() * 20)
      },
      weather: [{
        description: ['clear sky', 'few clouds', 'scattered clouds', 'partly cloudy'][Math.floor(Math.random() * 4)],
        icon: '01d'
      }],
      wind: {
        speed: Math.round(Math.random() * 15)
      },
      visibility: Math.round(8000 + Math.random() * 2000),
      name: 'Local Area',
      uvi: Math.round(Math.random() * 10)
    };
  }

  private getDefaultWeatherData(lat: number, lon: number): WeatherData {
    return {
      temperature: 22,
      description: 'Clear sky',
      humidity: 65,
      windSpeed: 8,
      pressure: 1015,
      visibility: 10,
      uvIndex: 5,
      feelsLike: 24,
      icon: '01d',
      location: 'Location',
      lastUpdated: new Date().toISOString()
    };
  }

  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}

export const weatherService = new WeatherService();
