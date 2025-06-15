
export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  source: string;
}

export class RealWeatherService {
  private apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Users need to set this

  async getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    try {
      // Try OpenWeatherMap API first
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      
      if (response.ok) {
        const data = await response.json();
        return this.formatOpenWeatherData(data);
      }
    } catch (error) {
      console.log('OpenWeatherMap API not available, using backup service');
    }

    // Fallback to free weather service
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );
      
      if (response.ok) {
        const data = await response.json();
        return this.formatOpenMeteoData(data, lat, lon);
      }
    } catch (error) {
      console.log('Open-Meteo API error, using simulated data');
    }

    // Final fallback to simulated data
    return this.getSimulatedWeather(lat, lon);
  }

  private formatOpenWeatherData(data: any): WeatherData {
    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      condition: data.weather[0].description,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      visibility: data.visibility / 1000, // Convert to km
      uvIndex: 0, // Would need separate UV API call
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      source: 'OpenWeatherMap API'
    };
  }

  private formatOpenMeteoData(data: any, lat: number, lon: number): WeatherData {
    const current = data.current_weather;
    const hourly = data.hourly;
    
    return {
      temperature: Math.round(current.temperature),
      humidity: hourly.relative_humidity_2m[0] || 60,
      condition: this.getConditionFromCode(current.weathercode),
      windSpeed: current.windspeed,
      pressure: 1013, // Standard pressure as fallback
      visibility: 10, // Default visibility
      uvIndex: 0,
      sunrise: '06:30',
      sunset: '18:30',
      source: 'Open-Meteo API (Free)'
    };
  }

  private getConditionFromCode(code: number): string {
    const conditions: Record<number, string> = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain'
    };
    return conditions[code] || 'Unknown';
  }

  private getSimulatedWeather(lat: number, lon: number): WeatherData {
    const baseTemp = this.estimateTemperatureByLocation(lat, lon);
    const conditions = ['Clear sky', 'Partly cloudy', 'Cloudy', 'Light rain'];
    
    return {
      temperature: baseTemp + Math.floor(Math.random() * 10) - 5,
      humidity: 40 + Math.floor(Math.random() * 40),
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      windSpeed: Math.random() * 20,
      pressure: 1000 + Math.random() * 50,
      visibility: 5 + Math.random() * 15,
      uvIndex: Math.floor(Math.random() * 11),
      sunrise: '06:30',
      sunset: '18:30',
      source: 'Simulated Weather Data'
    };
  }

  private estimateTemperatureByLocation(lat: number, lon: number): number {
    if (lat < -30) return 15; // Cape Town area - cooler
    if (lat > -25) return 25; // Northern areas - warmer
    return 20; // Central areas
  }
}

export const realWeatherService = new RealWeatherService();
