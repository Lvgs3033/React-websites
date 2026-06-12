import type { WeatherData, DetailedWeatherData, ForecastData, AirQualityData } from "./types"

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  // Add country code for more accurate results for Indian cities
  const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)},IN&units=metric&appid=${API_KEY}`)

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`)
  }

  const data = await response.json()

  // Validate that we got Indian city data
  if (data.sys.country !== "IN") {
    throw new Error(`City not found in India: ${city}`)
  }

  return data
}

export async function fetchForecastData(city: string): Promise<ForecastData> {
  const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)},IN&units=metric&appid=${API_KEY}`)

  if (!response.ok) {
    throw new Error(`Forecast API error: ${response.status}`)
  }

  return response.json()
}

export async function fetchDetailedWeather(city: string): Promise<DetailedWeatherData> {
  try {
    // Get current weather data
    const currentWeather = await fetchWeatherData(city)

    // Get forecast data
    const forecastData = await fetchForecastData(city)

    // Transform the data to match DetailedWeatherData interface
    const detailedData: DetailedWeatherData = {
      location: {
        name: currentWeather.name,
        state: "", // We'll get this from geocoding if needed
        country: currentWeather.sys.country,
        lat: 0, // Will be populated from geocoding
        lon: 0, // Will be populated from geocoding
      },
      current: {
        dt: currentWeather.dt,
        sunrise: currentWeather.sys.sunrise,
        sunset: currentWeather.sys.sunset,
        temp: currentWeather.main.temp,
        feels_like: currentWeather.main.feels_like,
        pressure: currentWeather.main.pressure,
        humidity: currentWeather.main.humidity,
        dew_point: currentWeather.main.temp - (100 - currentWeather.main.humidity) / 5, // Approximation
        uvi: 5, // Default value since basic API doesn't provide UV index
        clouds: 0, // Default value
        visibility: 10000, // Default 10km visibility
        wind_speed: currentWeather.wind.speed,
        wind_deg: currentWeather.wind.deg || 0,
        weather: currentWeather.weather,
      },
      hourly: forecastData.list.slice(0, 24).map((item) => ({
        dt: item.dt,
        temp: item.main.temp,
        feels_like: item.main.feels_like,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        wind_deg: item.wind.deg || 0,
        weather: item.weather,
      })),
      daily: [], // We'll populate this from forecast data
    }

    // Try to get coordinates for more accurate location data
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},IN&limit=1&appid=${API_KEY}`,
      )

      if (geoResponse.ok) {
        const [location] = await geoResponse.json()
        if (location) {
          detailedData.location!.lat = location.lat
          detailedData.location!.lon = location.lon
          detailedData.location!.state = location.state || ""
        }
      }
    } catch (error) {
      console.warn("Could not fetch geocoding data:", error)
    }

    // Process forecast data to create daily summaries
    const dailyMap = new Map<string, any>()

    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString()
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          dt: item.dt,
          sunrise: currentWeather.sys.sunrise,
          sunset: currentWeather.sys.sunset,
          temp: {
            day: item.main.temp,
            min: item.main.temp_min,
            max: item.main.temp_max,
            night: item.main.temp,
            eve: item.main.temp,
            morn: item.main.temp,
          },
          feels_like: {
            day: item.main.feels_like,
            night: item.main.feels_like,
            eve: item.main.feels_like,
            morn: item.main.feels_like,
          },
          pressure: item.main.pressure,
          humidity: item.main.humidity,
          wind_speed: item.wind.speed,
          wind_deg: item.wind.deg || 0,
          weather: item.weather,
        })
      } else {
        const existing = dailyMap.get(date)
        existing.temp.min = Math.min(existing.temp.min, item.main.temp_min)
        existing.temp.max = Math.max(existing.temp.max, item.main.temp_max)
      }
    })

    detailedData.daily = Array.from(dailyMap.values()).slice(0, 7)

    return detailedData
  } catch (error) {
    console.error("Error in fetchDetailedWeather:", error)
    throw error
  }
}

// Get air quality data for more comprehensive information
export async function fetchAirQuality(lat: number, lon: number): Promise<AirQualityData | null> {
  try {
    const response = await fetch(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)

    if (!response.ok) {
      console.warn(`Air Quality API error: ${response.status}`)
      return null
    }

    return response.json()
  } catch (error) {
    console.warn("Could not fetch air quality data:", error)
    return null
  }
}
