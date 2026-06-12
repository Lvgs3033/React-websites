"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { WeatherData, WeatherAccuracy } from "@/lib/types"
import { X, RefreshCw, Clock, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface WeatherCardProps {
  city: string
  weatherData?: WeatherData & { accuracy: WeatherAccuracy }
  onRemove: () => void
  onRefresh?: () => void
  loading?: boolean
  isStale?: boolean
}

export default function WeatherCard({ city, weatherData, onRemove, onRefresh, loading, isStale }: WeatherCardProps) {
  const router = useRouter()

  if (loading || !weatherData) {
    return (
      <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <Skeleton className="h-6 w-24" />
            <div className="flex gap-1">
              {onRefresh && (
                <Button variant="ghost" size="icon" disabled>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="icon" className="opacity-0" tabIndex={-1}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-8 w-24" />
            <div className="grid grid-cols-2 gap-4 w-full">
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getWeatherIcon = (code: string) => {
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

    return iconMap[code] || "fa-cloud"
  }

  const handleCardClick = () => {
    router.push(`/weather/${encodeURIComponent(city)}`)
  }

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onRefresh) {
      onRefresh()
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove()
  }

  const isDemoData = weatherData.accuracy.dataSource.includes("Demo")

  return (
    <Card
      className={`overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer ${
        isStale ? "border-orange-200 bg-orange-50/50" : ""
      } ${isDemoData ? "border-blue-200 bg-blue-50/50" : ""}`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2 bg-gradient-to-r from-indigo-100 to-purple-100">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>{city}</span>
            {isStale && (
              <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
                <Clock className="h-2 w-2 mr-1" />
                Stale
              </Badge>
            )}
            {isDemoData && (
              <Badge variant="outline" className="text-xs text-blue-600 border-blue-300">
                <Sparkles className="h-2 w-2 mr-1" />
                Demo
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            {onRefresh && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                className="text-gray-500 hover:text-blue-500"
                aria-label={`Refresh ${city} weather`}
                title="Refresh weather data"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-gray-500 hover:text-red-500"
              aria-label={`Remove ${city}`}
              title="Remove city"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <i
            className={`fas ${getWeatherIcon(weatherData.weather[0].icon)} text-4xl mb-4 text-indigo-600`}
            aria-hidden="true"
          />

          <div className="text-3xl font-bold mb-2 text-indigo-900">{Math.round(weatherData.main.temp)}°C</div>

          <p className="text-indigo-700 capitalize mb-4">{weatherData.weather[0].description}</p>

          <div className="grid grid-cols-2 gap-4 w-full text-sm">
            <div className="flex items-center gap-2">
              <i className="fas fa-temperature-high text-red-500" aria-hidden="true" />
              <span>Feels like: {Math.round(weatherData.main.feels_like)}°C</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fas fa-droplet text-blue-500" aria-hidden="true" />
              <span>Humidity: {weatherData.main.humidity}%</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fas fa-wind text-gray-500" aria-hidden="true" />
              <span>Wind: {Math.round(weatherData.wind.speed)} m/s</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fas fa-gauge text-purple-500" aria-hidden="true" />
              <span>Pressure: {weatherData.main.pressure} hPa</span>
            </div>
          </div>

          <div className="mt-4 w-full flex justify-center">
            <Badge
              variant={
                weatherData.accuracy.confidence === "high"
                  ? "default"
                  : weatherData.accuracy.confidence === "medium"
                    ? "secondary"
                    : "destructive"
              }
              className="text-xs"
            >
              {weatherData.accuracy.overall}% accurate
              {isDemoData && " (Demo)"}
            </Badge>
          </div>

          {isDemoData && (
            <div className="mt-2 text-xs text-blue-700 text-center">Using demo weather data for demonstration</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
