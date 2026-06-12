import type { WeatherData, DetailedWeatherData, ForecastData, WeatherAccuracy } from "./types"

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// Mock weather data for when API is not available
function getMockWeatherData(city: string): WeatherData & { accuracy: WeatherAccuracy } {
  const mockData: WeatherData = {
    name: city,
    main: {
      temp: 25 + Math.random() * 15, // Random temp between 25-40°C
      feels_like: 27 + Math.random() * 15,
      temp_min: 20 + Math.random() * 10,
      temp_max: 30 + Math.random() * 15,
      pressure: 1010 + Math.random() * 20,
      humidity: 50 + Math.random() * 40,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    wind: {
      speed: 2 + Math.random() * 8,
      deg: Math.random() * 360,
    },
    sys: {
      country: "IN",
      sunrise: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
      sunset: Math.floor(Date.now() / 1000) + 7200, // 2 hours from now
    },
    dt: Math.floor(Date.now() / 1000),
    timezone: 19800, // IST timezone
  }

  const accuracy: WeatherAccuracy = {
    overall: 60, // Lower accuracy for mock data
    temperature: 60,
    precipitation: 50,
    wind: 55,
    lastUpdated: new Date(),
    dataSource: "Mock Data (API Unavailable)",
    confidence: "low",
  }

  return { ...mockData, accuracy }
}

function getMockForecastData(city: string): ForecastData {
  const mockForecast: ForecastData = {
    city: {
      id: 1,
      name: city,
      country: "IN",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 7200,
    },
    list: [],
  }

  // Generate 40 forecast items (5 days * 8 times per day)
  for (let i = 0; i < 40; i++) {
    const baseTemp = 25 + Math.random() * 15
    mockForecast.list.push({
      dt: Math.floor(Date.now() / 1000) + i * 3 * 3600, // Every 3 hours
      main: {
        temp: baseTemp + (Math.random() - 0.5) * 10,
        feels_like: baseTemp + (Math.random() - 0.5) * 10,
        temp_min: baseTemp - 5,
        temp_max: baseTemp + 5,
        pressure: 1010 + Math.random() * 20,
        humidity: 50 + Math.random() * 40,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
      wind: {
        speed: 2 + Math.random() * 8,
        deg: Math.random() * 360,
      },
      dt_txt: new Date(Date.now() + i * 3 * 3600 * 1000).toISOString(),
    })
  }

  return mockForecast
}

export async function fetchAccurateWeatherData(city: string): Promise<WeatherData & { accuracy: WeatherAccuracy }> {
  // Check if API key is available
  if (!API_KEY) {
    console.warn("OpenWeatherMap API key not found, using mock data for:", city)
    return getMockWeatherData(city)
  }

  try {
    // Add country code for more accurate results for Indian cities
    const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)},IN&units=metric&appid=${API_KEY}`)

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Invalid OpenWeatherMap API key, using mock data for:", city)
        return getMockWeatherData(city)
      }
      if (response.status === 404) {
        throw new Error(`City not found: ${city}`)
      }
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    // Validate that we got Indian city data
    if (data.sys.country !== "IN") {
      throw new Error(`City not found in India: ${city}`)
    }

    // Calculate accuracy based on data quality
    const accuracy = calculateWeatherAccuracy(data)

    return { ...data, accuracy }
  } catch (error) {
    if (error instanceof Error && error.message.includes("City not found")) {
      throw error // Re-throw city not found errors
    }

    console.warn("Weather API error, using mock data for:", city, error)
    return getMockWeatherData(city)
  }
}

export async function fetchEnhancedDetailedWeather(
  city: string,
): Promise<DetailedWeatherData & { accuracy: WeatherAccuracy; insights: string }> {
  try {
    // Get current weather data with accuracy
    const currentWeather = await fetchAccurateWeatherData(city)

    // Get forecast data
    const forecastData = await fetchForecastData(city)

    // Validate forecast accuracy
    const forecastAccuracy = calculateForecastAccuracy(forecastData)

    // Transform the data to match DetailedWeatherData interface
    const detailedData: DetailedWeatherData & { accuracy: WeatherAccuracy; insights: string } = {
      location: {
        name: currentWeather.name,
        state: "",
        country: currentWeather.sys.country,
        lat: 0,
        lon: 0,
      },
      current: {
        dt: currentWeather.dt,
        sunrise: currentWeather.sys.sunrise,
        sunset: currentWeather.sys.sunset,
        temp: currentWeather.main.temp,
        feels_like: currentWeather.main.feels_like,
        pressure: currentWeather.main.pressure,
        humidity: currentWeather.main.humidity,
        dew_point: calculateDewPoint(currentWeather.main.temp, currentWeather.main.humidity),
        uvi: estimateUVIndex(currentWeather),
        clouds: 0,
        visibility: 10000,
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
      daily: [],
      accuracy: {
        overall: Math.min(currentWeather.accuracy.overall, forecastAccuracy.overall),
        temperature: Math.min(currentWeather.accuracy.temperature, forecastAccuracy.temperature),
        precipitation: forecastAccuracy.precipitation,
        wind: Math.min(currentWeather.accuracy.wind, forecastAccuracy.wind),
        lastUpdated: new Date(),
        dataSource: currentWeather.accuracy.dataSource,
        confidence: calculateOverallConfidence(currentWeather.accuracy, forecastAccuracy),
      },
      insights: "",
    }

    // Only try to get coordinates if we have a real API key
    if (API_KEY && !currentWeather.accuracy.dataSource.includes("Mock")) {
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
    console.error("Error in fetchEnhancedDetailedWeather:", error)
    throw error
  }
}

function calculateWeatherAccuracy(data: WeatherData): WeatherAccuracy {
  const now = Date.now()
  const dataAge = (now - data.dt * 1000) / (1000 * 60) // minutes

  let overall = 100
  const temperature = 95
  let precipitation = 90
  let wind = 85

  // Reduce accuracy based on data age
  if (dataAge > 30) overall -= 10
  if (dataAge > 60) overall -= 20
  if (dataAge > 120) overall -= 30

  // Adjust based on weather conditions complexity
  const condition = data.weather[0].main.toLowerCase()
  if (condition.includes("rain") || condition.includes("storm")) {
    precipitation = 75
    overall -= 5
  }

  // Wind accuracy depends on measurement consistency
  if (data.wind.speed > 10) wind = 80

  return {
    overall: Math.max(overall, 60),
    temperature: Math.max(temperature, 80),
    precipitation: Math.max(precipitation, 70),
    wind: Math.max(wind, 70),
    lastUpdated: new Date(),
    dataSource: "OpenWeatherMap",
    confidence: overall >= 85 ? "high" : overall >= 70 ? "medium" : "low",
  }
}

function calculateForecastAccuracy(data: ForecastData): WeatherAccuracy {
  // Forecast accuracy decreases with time
  let overall = 90
  const temperature = 85
  let precipitation = 70
  const wind = 75

  // 5-day forecast has inherent limitations
  overall -= 10
  precipitation -= 15

  return {
    overall: Math.max(overall, 60),
    temperature: Math.max(temperature, 75),
    precipitation: Math.max(precipitation, 60),
    wind: Math.max(wind, 65),
    lastUpdated: new Date(),
    dataSource: "OpenWeatherMap Forecast",
    confidence: overall >= 80 ? "high" : overall >= 65 ? "medium" : "low",
  }
}

function calculateDewPoint(temp: number, humidity: number): number {
  // Magnus formula approximation
  const a = 17.27
  const b = 237.7
  const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100)
  return (b * alpha) / (a - alpha)
}

function estimateUVIndex(data: WeatherData): number {
  // Estimate UV index based on time, season, and cloud cover
  const hour = new Date(data.dt * 1000).getHours()
  const condition = data.weather[0].main.toLowerCase()

  let baseUV = 5 // Default moderate UV

  // Time of day adjustment
  if (hour >= 10 && hour <= 14) baseUV = 8
  else if (hour >= 8 && hour <= 16) baseUV = 6
  else if (hour >= 6 && hour <= 18) baseUV = 3
  else baseUV = 0

  // Weather condition adjustment
  if (condition.includes("clear") || condition.includes("sun")) baseUV += 2
  if (condition.includes("cloud")) baseUV -= 2
  if (condition.includes("rain") || condition.includes("storm")) baseUV -= 4

  return Math.max(0, Math.min(11, baseUV))
}

function calculateOverallConfidence(current: WeatherAccuracy, forecast: WeatherAccuracy): "high" | "medium" | "low" {
  const avgAccuracy = (current.overall + forecast.overall) / 2
  if (avgAccuracy >= 85) return "high"
  if (avgAccuracy >= 70) return "medium"
  return "low"
}

export async function fetchForecastData(city: string): Promise<ForecastData> {
  // Check if API key is available
  if (!API_KEY) {
    console.warn("OpenWeatherMap API key not found, using mock forecast data for:", city)
    return getMockForecastData(city)
  }

  try {
    const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)},IN&units=metric&appid=${API_KEY}`)

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Invalid OpenWeatherMap API key, using mock forecast data for:", city)
        return getMockForecastData(city)
      }
      throw new Error(`Forecast API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.warn("Forecast API error, using mock data for:", city, error)
    return getMockForecastData(city)
  }
}
