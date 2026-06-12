"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, RotateCcw, Download, Sparkles, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { usePersistentCities } from "@/hooks/use-persistent-cities"
import { usePersistentWeather } from "@/hooks/use-persistent-weather"
import WeatherCard from "./weather-card"
import VoiceInput from "./voice-input"
import SmartCityInput from "./smart-city-input"
import { fetchWeatherData } from "@/lib/weather-service"

export default function VatavaranDashboard() {
  const {
    cities,
    isLoaded: citiesLoaded,
    addCity: addCityToPersistent,
    removeCity: removeCityFromPersistent,
    clearAllCities,
    resetToDefault,
  } = usePersistentCities()
  const {
    weatherData,
    isLoaded: weatherLoaded,
    updateWeatherData,
    removeWeatherData,
    isDataFresh,
  } = usePersistentWeather()
  const [loading, setLoading] = useState(false)
  const [fetchingCities, setFetchingCities] = useState<Set<string>>(new Set())
  const [showDemoAlert, setShowDemoAlert] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(true) // Always true since we're using demo data
  const { toast } = useToast()

  const addCity = async (cityName: string) => {
    const city = cityName.trim()
    if (!city) return

    if (cities.includes(city)) {
      toast({
        title: "City already added",
        description: `${city} is already in your dashboard`,
        variant: "destructive",
      })
      return
    }

    const added = addCityToPersistent(city)
    if (!added) return

    setFetchingCities((prev) => new Set(prev).add(city))

    try {
      const data = await fetchWeatherData(city)
      updateWeatherData(city, data)

      toast({
        title: "City added successfully",
        description: (
          <div className="flex items-center gap-2">
            <span>Weather data for {city} added</span>
            <Badge
              variant={
                data.accuracy.confidence === "high"
                  ? "default"
                  : data.accuracy.confidence === "medium"
                    ? "secondary"
                    : "destructive"
              }
            >
              {data.accuracy.overall}% accurate
            </Badge>
          </div>
        ),
      })
    } catch (error) {
      removeCityFromPersistent(city)
      toast({
        title: "Error",
        description: `Could not find weather data for ${city}`,
        variant: "destructive",
      })
    } finally {
      setFetchingCities((prev) => {
        const newSet = new Set(prev)
        newSet.delete(city)
        return newSet
      })
    }
  }

  const removeCity = (city: string) => {
    removeCityFromPersistent(city)
    removeWeatherData(city)
    toast({
      title: "City removed",
      description: `${city} has been removed from your dashboard`,
    })
  }

  const handleVoiceInput = (text: string) => {
    const cityMatch = text.match(/(?:weather|temperature|forecast)(?:\s+in|\s+for|\s+at)?\s+([a-zA-Z\s]+)$/i)
    if (cityMatch && cityMatch[1]) {
      const detectedCity = cityMatch[1].trim()
      addCity(detectedCity)
    } else {
      toast({
        title: "Command not recognized",
        description: "Try saying 'Weather in [city name]'",
        variant: "destructive",
      })
    }
  }

  const refreshWeatherData = async (city: string) => {
    setFetchingCities((prev) => new Set(prev).add(city))

    try {
      const data = await fetchWeatherData(city)
      updateWeatherData(city, data)
      toast({
        title: "Weather refreshed",
        description: `Updated weather data for ${city}`,
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: `Could not refresh weather data for ${city}`,
        variant: "destructive",
      })
    } finally {
      setFetchingCities((prev) => {
        const newSet = new Set(prev)
        newSet.delete(city)
        return newSet
      })
    }
  }

  const refreshAllWeatherData = async () => {
    setLoading(true)
    const promises = cities.map((city) =>
      fetchWeatherData(city)
        .then((data) => updateWeatherData(city, data))
        .catch((error) => console.error(`Error refreshing ${city}:`, error)),
    )

    await Promise.all(promises)
    setLoading(false)
    toast({
      title: "All weather data refreshed",
      description: "Updated weather information for all cities",
    })
  }

  useEffect(() => {
    if (citiesLoaded && weatherLoaded && cities.length > 0) {
      const citiesToFetch = cities.filter((city) => {
        try {
          return !weatherData[city] || !isDataFresh(city)
        } catch (error) {
          console.error(`Error checking freshness for ${city}:`, error)
          return true
        }
      })

      if (citiesToFetch.length > 0) {
        setLoading(true)
        const fetchPromises = citiesToFetch.map(async (city) => {
          try {
            const data = await fetchWeatherData(city)
            updateWeatherData(city, data)
          } catch (error) {
            console.error(`Error fetching data for ${city}:`, error)
          }
        })

        Promise.all(fetchPromises).finally(() => {
          setLoading(false)
        })
      }
    }
  }, [citiesLoaded, weatherLoaded, cities])

  if (!citiesLoaded || !weatherLoaded) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-indigo-900">वातावरण (Vatavaran)</h1>
          <p className="text-indigo-700 mb-6">Loading your saved cities...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {isDemoMode && showDemoAlert && (
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <AlertDescription className="flex items-center justify-between">
            <div className="text-blue-800">
              <strong>Demo Mode:</strong> This app is running with realistic demo weather data for Indian cities. All
              features are fully functional!
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDemoAlert(false)}
              className="text-blue-600 hover:text-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-indigo-900">वातावरण (Vatavaran)</h1>
        <p className="text-indigo-700 mb-6">
          AI-Powered Indian Cities Weather Dashboard
          {isDemoMode && <span className="text-blue-600"> (Demo Mode)</span>}
        </p>

        <Card className="p-4 bg-white/80 backdrop-blur-sm max-w-md mx-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 justify-center">
              <i className="fas fa-sparkles text-yellow-500" />
              Smart City Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SmartCityInput onCitySelect={addCity} />
            <div className="text-center text-sm text-gray-500">or</div>
            <VoiceInput onResult={handleVoiceInput} />
          </CardContent>
        </Card>

        {cities.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Button variant="outline" size="sm" onClick={refreshAllWeatherData} disabled={loading}>
              <RotateCcw className="h-3 w-3 mr-1" />
              Refresh All
            </Button>
            <Button variant="outline" size="sm" onClick={resetToDefault}>
              <Download className="h-3 w-3 mr-1" />
              Reset to Default
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllCities}
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <WeatherCard
            key={city}
            city={city}
            weatherData={weatherData[city]}
            onRemove={() => removeCity(city)}
            onRefresh={() => refreshWeatherData(city)}
            loading={loading || fetchingCities.has(city)}
            isStale={weatherData[city] ? !isDataFresh(city) : false}
          />
        ))}
      </div>

      {cities.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          <i className="fas fa-cloud-sun text-4xl mb-4 text-gray-300" />
          <p className="mb-4">No cities added. Start by searching for an Indian city above!</p>
          <Button onClick={resetToDefault} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Load Default Cities
          </Button>
        </div>
      )}
    </div>
  )
}
