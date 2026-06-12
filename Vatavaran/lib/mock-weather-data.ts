import type { WeatherData, ForecastData, DetailedWeatherData, WeatherAccuracy, AirQualityData } from "./types"

// Indian cities with their approximate coordinates and typical weather patterns
const INDIAN_CITIES_DATA = {
  Mumbai: { lat: 19.076, lon: 72.8777, state: "Maharashtra", temp: [25, 35], humidity: [70, 90] },
  Delhi: { lat: 28.7041, lon: 77.1025, state: "Delhi", temp: [20, 40], humidity: [40, 80] },
  Bangalore: { lat: 12.9716, lon: 77.5946, state: "Karnataka", temp: [18, 28], humidity: [50, 70] },
  Chennai: { lat: 13.0827, lon: 80.2707, state: "Tamil Nadu", temp: [24, 36], humidity: [60, 85] },
  Kolkata: { lat: 22.5726, lon: 88.3639, state: "West Bengal", temp: [22, 35], humidity: [65, 90] },
  Hyderabad: { lat: 17.385, lon: 78.4867, state: "Telangana", temp: [20, 35], humidity: [45, 75] },
  Pune: { lat: 18.5204, lon: 73.8567, state: "Maharashtra", temp: [18, 32], humidity: [50, 80] },
  Ahmedabad: { lat: 23.0225, lon: 72.5714, state: "Gujarat", temp: [22, 38], humidity: [40, 70] },
  Jaipur: { lat: 26.9124, lon: 75.7873, state: "Rajasthan", temp: [18, 38], humidity: [35, 65] },
  Lucknow: { lat: 26.8467, lon: 80.9462, state: "Uttar Pradesh", temp: [15, 35], humidity: [50, 80] },
  Kochi: { lat: 9.9312, lon: 76.2673, state: "Kerala", temp: [24, 32], humidity: [70, 90] },
  Goa: { lat: 15.2993, lon: 74.124, state: "Goa", temp: [24, 33], humidity: [65, 85] },
  Chandigarh: { lat: 30.7333, lon: 76.7794, state: "Chandigarh", temp: [15, 35], humidity: [45, 75] },
  Bhopal: { lat: 23.2599, lon: 77.4126, state: "Madhya Pradesh", temp: [18, 35], humidity: [50, 75] },
  Indore: { lat: 22.7196, lon: 75.8577, state: "Madhya Pradesh", temp: [18, 35], humidity: [45, 70] },
}

const WEATHER_CONDITIONS = [
  { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
  { id: 801, main: "Clouds", description: "few clouds", icon: "02d" },
  { id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" },
  { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" },
  { id: 500, main: "Rain", description: "light rain", icon: "10d" },
  { id: 501, main: "Rain", description: "moderate rain", icon: "10d" },
  { id: 701, main: "Mist", description: "mist", icon: "50d" },
]

function getRandomWeatherCondition() {
  return WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)]
}

function getRandomInRange(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10
}

export function generateMockWeatherData(cityName: string): WeatherData & { accuracy: WeatherAccuracy } {
  const cityData = INDIAN_CITIES_DATA[cityName as keyof typeof INDIAN_CITIES_DATA] || INDIAN_CITIES_DATA.Mumbai
  const weather = getRandomWeatherCondition()

  const temp = getRandomInRange(cityData.temp[0], cityData.temp[1])
  const humidity = getRandomInRange(cityData.humidity[0], cityData.humidity[1])

  const mockData: WeatherData = {
    name: cityName,
    main: {
      temp,
      feels_like: temp + getRandomInRange(-3, 5),
      temp_min: temp - getRandomInRange(2, 5),
      temp_max: temp + getRandomInRange(2, 8),
      pressure: getRandomInRange(1005, 1025),
      humidity,
    },
    weather: [weather],
    wind: {
      speed: getRandomInRange(1, 15),
      deg: Math.floor(Math.random() * 360),
    },
    sys: {
      country: "IN",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 7200,
    },
    dt: Math.floor(Date.now() / 1000),
    timezone: 19800, // IST
  }

  const accuracy: WeatherAccuracy = {
    overall: 85,
    temperature: 90,
    precipitation: 80,
    wind: 75,
    lastUpdated: new Date(),
    dataSource: "Demo Weather Service",
    confidence: "high",
  }

  return { ...mockData, accuracy }
}

export function generateMockForecastData(cityName: string): ForecastData {
  const cityData = INDIAN_CITIES_DATA[cityName as keyof typeof INDIAN_CITIES_DATA] || INDIAN_CITIES_DATA.Mumbai

  const mockForecast: ForecastData = {
    city: {
      id: 1,
      name: cityName,
      country: "IN",
      sunrise: Math.floor(Date.now() / 1000) - 3600,
      sunset: Math.floor(Date.now() / 1000) + 7200,
    },
    list: [],
  }

  // Generate 40 forecast items (5 days * 8 times per day)
  for (let i = 0; i < 40; i++) {
    const baseTemp = getRandomInRange(cityData.temp[0], cityData.temp[1])
    const weather = getRandomWeatherCondition()

    mockForecast.list.push({
      dt: Math.floor(Date.now() / 1000) + i * 3 * 3600,
      main: {
        temp: baseTemp + getRandomInRange(-5, 5),
        feels_like: baseTemp + getRandomInRange(-3, 7),
        temp_min: baseTemp - getRandomInRange(2, 5),
        temp_max: baseTemp + getRandomInRange(2, 8),
        pressure: getRandomInRange(1005, 1025),
        humidity: getRandomInRange(cityData.humidity[0], cityData.humidity[1]),
      },
      weather: [weather],
      wind: {
        speed: getRandomInRange(1, 15),
        deg: Math.floor(Math.random() * 360),
      },
      dt_txt: new Date(Date.now() + i * 3 * 3600 * 1000).toISOString(),
    })
  }

  return mockForecast
}

export function generateMockDetailedWeatherData(cityName: string): DetailedWeatherData {
  const cityData = INDIAN_CITIES_DATA[cityName as keyof typeof INDIAN_CITIES_DATA] || INDIAN_CITIES_DATA.Mumbai
  const currentWeather = generateMockWeatherData(cityName)
  const forecastData = generateMockForecastData(cityName)

  const detailedData: DetailedWeatherData = {
    location: {
      name: cityName,
      state: cityData.state,
      country: "IN",
      lat: cityData.lat,
      lon: cityData.lon,
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
      uvi: getRandomInRange(3, 9),
      clouds: getRandomInRange(0, 100),
      visibility: getRandomInRange(8000, 10000),
      wind_speed: currentWeather.wind.speed,
      wind_deg: currentWeather.wind.deg,
      weather: currentWeather.weather,
    },
    hourly: forecastData.list.slice(0, 24).map((item) => ({
      dt: item.dt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      pressure: item.main.pressure,
      humidity: item.main.humidity,
      wind_speed: item.wind.speed,
      wind_deg: item.wind.deg,
      weather: item.weather,
    })),
    daily: [],
    accuracy: currentWeather.accuracy,
    insights: generateWeatherInsight(currentWeather),
  }

  // Generate daily forecast
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
          night: item.main.temp - 3,
          eve: item.main.temp - 1,
          morn: item.main.temp - 2,
        },
        feels_like: {
          day: item.main.feels_like,
          night: item.main.feels_like - 3,
          eve: item.main.feels_like - 1,
          morn: item.main.feels_like - 2,
        },
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        wind_deg: item.wind.deg,
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
}

export function generateMockAirQualityData(lat: number, lon: number): AirQualityData {
  return {
    coord: { lat, lon },
    list: [
      {
        main: { aqi: Math.floor(Math.random() * 4) + 1 },
        components: {
          co: getRandomInRange(200, 400),
          no: getRandomInRange(0, 50),
          no2: getRandomInRange(10, 80),
          o3: getRandomInRange(50, 150),
          so2: getRandomInRange(5, 30),
          pm2_5: getRandomInRange(10, 60),
          pm10: getRandomInRange(20, 100),
          nh3: getRandomInRange(1, 20),
        },
        dt: Math.floor(Date.now() / 1000),
      },
    ],
  }
}

function calculateDewPoint(temp: number, humidity: number): number {
  const a = 17.27
  const b = 237.7
  const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100)
  return (b * alpha) / (a - alpha)
}

function generateWeatherInsight(weatherData: WeatherData): string {
  const temp = Math.round(weatherData.main.temp)
  const condition = weatherData.weather[0].description
  const humidity = weatherData.main.humidity

  let insight = `Current conditions in ${weatherData.name}: ${condition} with ${temp}°C. `

  if (temp > 35) {
    insight += "It's quite hot today, so stay hydrated and avoid prolonged sun exposure. "
  } else if (temp < 15) {
    insight += "It's cool today, consider wearing layers to stay comfortable. "
  } else {
    insight += "Pleasant temperature for outdoor activities. "
  }

  if (humidity > 80) {
    insight += "High humidity may make it feel warmer than it is."
  } else if (humidity < 30) {
    insight += "Low humidity - stay hydrated and consider using moisturizer."
  } else {
    insight += "Comfortable humidity levels today."
  }

  return insight
}

export function isValidIndianCity(cityName: string): boolean {
  const normalizedCity = cityName.toLowerCase().trim()
  const validCities = Object.keys(INDIAN_CITIES_DATA).map((city) => city.toLowerCase())

  // Check exact match first
  if (validCities.includes(normalizedCity)) {
    return true
  }

  // Check partial matches
  return validCities.some((city) => city.includes(normalizedCity) || normalizedCity.includes(city))
}

export function getClosestCityMatch(input: string): string {
  const normalizedInput = input.toLowerCase().trim()
  const cities = Object.keys(INDIAN_CITIES_DATA)

  // Exact match
  const exactMatch = cities.find((city) => city.toLowerCase() === normalizedInput)
  if (exactMatch) return exactMatch

  // Starts with match
  const startsWithMatch = cities.find((city) => city.toLowerCase().startsWith(normalizedInput))
  if (startsWithMatch) return startsWithMatch

  // Contains match
  const containsMatch = cities.find((city) => city.toLowerCase().includes(normalizedInput))
  if (containsMatch) return containsMatch

  // Default to Mumbai if no match
  return "Mumbai"
}
