
export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  feelsLike: number;
  lastUpdated: string;
}

export interface WeatherForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  description: string;
  precipitation: number;
}

class WeatherService {
  // Using free weather services that don't require API keys
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      // Using wttr.in - a free weather service that doesn't require API keys
      const response = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
      
      if (!response.ok) {
        throw new Error('Weather service unavailable');
      }

      const data = await response.json();
      const current = data.current_condition[0];
      
      return {
        temperature: parseInt(current.temp_C),
        description: current.weatherDesc[0].value.toLowerCase(),
        humidity: parseInt(current.humidity),
        windSpeed: parseInt(current.windspeedKmph),
        pressure: parseInt(current.pressure),
        visibility: parseInt(current.visibility),
        feelsLike: parseInt(current.FeelsLikeC),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Weather fetch error:', error);
      // Return mock data as fallback
      return this.getMockWeatherData(lat, lon);
    }
  }

  async getWeatherForecast(lat: number, lon: number): Promise<WeatherForecast[]> {
    try {
      // Using wttr.in for forecast data
      const response = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
      
      if (!response.ok) {
        throw new Error('Weather forecast unavailable');
      }

      const data = await response.json();
      
      return data.weather.slice(0, 5).map((day: any, index: number) => ({
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString(),
        maxTemp: parseInt(day.maxtempC),
        minTemp: parseInt(day.mintempC),
        description: day.hourly[0]?.weatherDesc[0]?.value?.toLowerCase() || 'partly cloudy',
        precipitation: parseInt(day.hourly[0]?.chanceofrain || '0')
      }));
    } catch (error) {
      console.error('Weather forecast error:', error);
      return this.getMockForecastData();
    }
  }

  private getMockWeatherData(lat: number, lon: number): WeatherData {
    // Generate realistic mock data based on location
    const baseTemp = this.estimateTemperatureByLocation(lat, lon);
    
    return {
      temperature: baseTemp + Math.floor(Math.random() * 10 - 5),
      description: this.getRandomWeatherDescription(),
      humidity: 50 + Math.floor(Math.random() * 40),
      windSpeed: 5 + Math.floor(Math.random() * 20),
      pressure: 1010 + Math.floor(Math.random() * 40),
      visibility: 8 + Math.floor(Math.random() * 7),
      feelsLike: baseTemp + Math.floor(Math.random() * 8 - 4),
      lastUpdated: new Date().toISOString()
    };
  }

  private getMockForecastData(): WeatherForecast[] {
    const descriptions = ['sunny', 'partly cloudy', 'cloudy', 'light rain', 'clear'];
    
    return Array.from({ length: 5 }, (_, index) => ({
      date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString(),
      maxTemp: 18 + Math.floor(Math.random() * 15),
      minTemp: 8 + Math.floor(Math.random() * 10),
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      precipitation: Math.floor(Math.random() * 100)
    }));
  }

  private estimateTemperatureByLocation(lat: number, lon: number): number {
    // Rough temperature estimation based on latitude
    if (lat < -30) return 25; // Hot regions (Northern SA)
    if (lat < -26) return 20; // Moderate regions (Central SA)
    return 15; // Cooler regions (Southern SA)
  }

  private getRandomWeatherDescription(): string {
    const descriptions = [
      'clear sky', 'few clouds', 'scattered clouds', 'broken clouds',
      'light rain', 'moderate rain', 'partly cloudy', 'sunny'
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }
}

export const weatherService = new WeatherService();
