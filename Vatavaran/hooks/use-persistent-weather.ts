"use client"

import { useState, useEffect } from "react"
import type { WeatherData, WeatherAccuracy } from "@/lib/types"

const WEATHER_STORAGE_KEY = "vatavaran-weather-data"
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

interface CachedWeatherData {
  data: WeatherData & { accuracy: WeatherAccuracy }
  timestamp: number
}

export function usePersistentWeather() {
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData & { accuracy: WeatherAccuracy }>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const savedWeatherData = localStorage.getItem(WEATHER_STORAGE_KEY)
      if (savedWeatherData) {
        const parsedData: Record<string, CachedWeatherData> = JSON.parse(savedWeatherData)
        const currentTime = Date.now()
        const validData: Record<string, WeatherData & { accuracy: WeatherAccuracy }> = {}

        Object.entries(parsedData).forEach(([city, cachedData]) => {
          if (currentTime - cachedData.timestamp < CACHE_DURATION) {
            const data = { ...cachedData.data }
            if (data.accuracy && data.accuracy.lastUpdated) {
              data.accuracy.lastUpdated = new Date(data.accuracy.lastUpdated)
            }
            validData[city] = data
          }
        })

        setWeatherData(validData)
      }
    } catch (error) {
      console.error("Error loading weather data from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isLoaded) {
      try {
        const dataToCache: Record<string, CachedWeatherData> = {}
        const currentTime = Date.now()

        Object.entries(weatherData).forEach(([city, data]) => {
          dataToCache[city] = {
            data,
            timestamp: currentTime,
          }
        })

        localStorage.setItem(WEATHER_STORAGE_KEY, JSON.stringify(dataToCache))
      } catch (error) {
        console.error("Error saving weather data to localStorage:", error)
      }
    }
  }, [weatherData, isLoaded])

  const updateWeatherData = (city: string, data: WeatherData & { accuracy: WeatherAccuracy }) => {
    const dataWithProperDate = {
      ...data,
      accuracy: {
        ...data.accuracy,
        lastUpdated: new Date(data.accuracy.lastUpdated),
      },
    }

    setWeatherData((prev) => ({
      ...prev,
      [city]: dataWithProperDate,
    }))
  }

  const removeWeatherData = (city: string) => {
    setWeatherData((prev) => {
      const newData = { ...prev }
      delete newData[city]
      return newData
    })
  }

  const clearAllWeatherData = () => {
    setWeatherData({})
    localStorage.removeItem(WEATHER_STORAGE_KEY)
  }

  const isDataFresh = (city: string): boolean => {
    const data = weatherData[city]
    if (!data || !data.accuracy || !data.accuracy.lastUpdated) return false

    try {
      const lastUpdated =
        data.accuracy.lastUpdated instanceof Date ? data.accuracy.lastUpdated : new Date(data.accuracy.lastUpdated)

      const dataAge = Date.now() - lastUpdated.getTime()
      return dataAge < CACHE_DURATION
    } catch (error) {
      console.error("Error checking data freshness:", error)
      return false
    }
  }

  return {
    weatherData,
    isLoaded,
    updateWeatherData,
    removeWeatherData,
    clearAllWeatherData,
    isDataFresh,
  }
}
