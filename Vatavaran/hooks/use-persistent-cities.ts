"use client"

import { useState, useEffect } from "react"

const STORAGE_KEY = "vatavaran-cities"
const DEFAULT_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
]

export function usePersistentCities() {
  const [cities, setCities] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const savedCities = localStorage.getItem(STORAGE_KEY)
      if (savedCities) {
        const parsedCities = JSON.parse(savedCities)
        if (Array.isArray(parsedCities) && parsedCities.length > 0) {
          setCities(parsedCities)
        } else {
          setCities(DEFAULT_CITIES)
        }
      } else {
        setCities(DEFAULT_CITIES)
      }
    } catch (error) {
      console.error("Error loading cities from localStorage:", error)
      setCities(DEFAULT_CITIES)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isLoaded && cities.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cities))
      } catch (error) {
        console.error("Error saving cities to localStorage:", error)
      }
    }
  }, [cities, isLoaded])

  const addCity = (city: string) => {
    const trimmedCity = city.trim()
    if (!trimmedCity || cities.includes(trimmedCity)) {
      return false
    }
    setCities((prev) => [...prev, trimmedCity])
    return true
  }

  const removeCity = (city: string) => {
    setCities((prev) => prev.filter((c) => c !== city))
  }

  const clearAllCities = () => {
    setCities([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const resetToDefault = () => {
    setCities(DEFAULT_CITIES)
  }

  return {
    cities,
    isLoaded,
    addCity,
    removeCity,
    clearAllCities,
    resetToDefault,
  }
}
