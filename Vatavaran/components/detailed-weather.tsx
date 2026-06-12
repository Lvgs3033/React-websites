"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Clock, RefreshCw, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { fetchDetailedWeather, fetchAirQuality } from "@/lib/weather-service"
import { getWeatherInsights } from "@/lib/ai-service"
import type { DetailedWeatherData, AirQualityData } from "@/lib/types"

interface DetailedWeatherProps {
  city: string
}

export default function DetailedWeather({ city }: DetailedWeatherProps) {
  const [weatherData, setWeatherData] = useState<DetailedWeatherData | null>(null)
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const router = useRouter()
  const { toast } = useToast()

  const fetchData = async () => {
    setLoading(true)

    try {
      console.log("Fetching detailed weather data for:", city)
      const data = await fetchDetailedWeather(city)

      // Get AI insights
      const insights = await getWeatherInsights(data)
      data.insights = insights

      console.log("Detailed weather data received:", data)
      setWeatherData(data)

      // Fetch air quality data if we have coordinates
      if (data.location && data.location.lat && data.location.lon) {
        try {
          const airData = await fetchAirQuality(data.location.lat, data.location.lon)
          if (airData) {
            setAirQuality(airData)
          }
        } catch (airError) {
          console.warn("Air quality data not available:", airError)
        }
      }

      setLastUpdated(new Date())
      toast({
        title: "Weather Updated",
        description: `Latest weather data for ${city}`,
      })
    } catch (error) {
      console.error("Error fetching weather data:", error)
      toast({
        title: "Error",
        description: "Could not fetch weather data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [city])

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl p-4">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!weatherData) {
    return (
      <div className="container mx-auto max-w-4xl p-4">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-800 mb-2">Unable to Load Weather Data</h2>
            <p className="text-red-600 mb-4">Something went wrong</p>
            <Button onClick={fetchData} className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const currentTemp = Math.round(weatherData.current.temp)
  const currentCondition = weatherData.current.weather[0].description
  const feelsLike = Math.round(weatherData.current.feels_like)
  const isDemoData = weatherData.accuracy?.dataSource?.includes("Demo")

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="grid gap-6">
        {/* Header with Location and Status */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-indigo-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{city}</h1>
                {weatherData.location && (
                  <p className="text-gray-600">
                    {weatherData.location.state && `${weatherData.location.state}, `}India
                    {weatherData.location.lat && weatherData.location.lon && (
                      <span>
                        {" "}
                        • {weatherData.location.lat.toFixed(2)}°N, {weatherData.location.lon.toFixed(2)}°E
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant={
                    weatherData.accuracy?.confidence === "high"
                      ? "default"
                      : weatherData.accuracy?.confidence === "medium"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {weatherData.accuracy?.overall || 85}% Accurate
                </Badge>
                {isDemoData && (
                  <Badge variant="outline" className="text-blue-600 border-blue-300">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Demo
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <Clock className="h-3 w-3" />
                Updated {lastUpdated.toLocaleTimeString()}
              </div>
              <Button variant="ghost" size="sm" onClick={fetchData} className="mt-1">
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl">
                <i className={`fas ${getWeatherIcon(weatherData.current.weather[0].icon)} text-yellow-500`} />
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900">{currentTemp}°C</div>
                <p className="text-gray-600 capitalize text-lg">{currentCondition}</p>
                <p className="text-gray-500">Feels like {feelsLike}°C</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <i className="fas fa-droplet text-blue-500" />
                  <span className="text-sm text-gray-600">Humidity</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{weatherData.current.humidity}%</div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <i className="fas fa-wind text-green-500" />
                  <span className="text-sm text-gray-600">Wind Speed</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(weatherData.current.wind_speed * 3.6)} km/h
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <i className="fas fa-gauge text-purple-500" />
                  <span className="text-sm text-gray-600">Pressure</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">{weatherData.current.pressure} hPa</div>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <i className="fas fa-sun text-orange-500" />
                  <span className="text-sm text-gray-600">UV Index</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">{Math.round(weatherData.current.uvi)}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Weather Insights */}
        {weatherData.insights && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <i className="fas fa-lightbulb" />
                Weather Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 leading-relaxed">{weatherData.insights}</p>
            </CardContent>
          </Card>
        )}

        {/* Additional Weather Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Sun & Moon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">
                    {new Date(weatherData.current.sunrise * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <p className="text-gray-600">Sunrise</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {new Date(weatherData.current.sunset * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <p className="text-gray-600">Sunset</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Atmospheric Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {(weatherData.current.visibility / 1000).toFixed(1)} km
                  </div>
                  <p className="text-gray-600">Visibility</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{weatherData.current.dew_point.toFixed(1)}°C</div>
                  <p className="text-gray-600">Dew Point</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {isDemoData && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-blue-800">
                <Sparkles className="h-5 w-5" />
                <p>
                  <strong>Demo Mode:</strong> This detailed weather view is showing realistic demo data for {city}. All
                  features are fully functional and demonstrate the complete weather dashboard experience.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function getWeatherIcon(icon: string) {
  const iconMap: Record<string, string> = {
    "01d": "fa-sun",
    "01n": "fa-moon",
    "02d": "fa-cloud-sun",
    "02n": "fa-cloud-moon",
    "03d": "fa-cloud",
    "03n": "fa-cloud",
    "04d": "fa-clouds",
    "04n": "fa-clouds",
    "09d": "fa-cloud-showers-heavy",
    "09n": "fa-cloud-showers-heavy",
    "10d": "fa-cloud-sun-rain",
    "10n": "fa-cloud-moon-rain",
    "11d": "fa-cloud-bolt",
    "11n": "fa-cloud-bolt",
    "13d": "fa-snowflake",
    "13n": "fa-snowflake",
    "50d": "fa-smog",
    "50n": "fa-smog",
  }

  return iconMap[icon] || "fa-cloud"
}
