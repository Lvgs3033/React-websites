"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, MapPin, Search } from "lucide-react"
import { getAICitySuggestions } from "@/lib/ai-service"

interface SmartCityInputProps {
  onCitySelect: (city: string) => void
  placeholder?: string
}

export default function SmartCityInput({ onCitySelect, placeholder = "Enter city name..." }: SmartCityInputProps) {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout>()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (input.length >= 2) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(async () => {
        setLoading(true)
        try {
          const citySuggestions = await getAICitySuggestions(input)
          setSuggestions(citySuggestions)
          setShowSuggestions(true)
        } catch (error) {
          console.error("Error getting suggestions:", error)
          setSuggestions(["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"])
          setShowSuggestions(true)
        } finally {
          setLoading(false)
        }
      }, 300)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [input])

  const handleSuggestionClick = (city: string) => {
    setInput(city)
    setShowSuggestions(false)
    onCitySelect(city)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onCitySelect(input.trim())
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={input}
            onChange={handleInputChange}
            onFocus={() => input.length >= 2 && setShowSuggestions(true)}
            className="bg-white pr-10"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            </div>
          )}
        </div>
        <Button type="submit" disabled={!input.trim()}>
          Add City
        </Button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 bg-white shadow-lg border">
          <div className="p-2">
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
              <Search className="h-3 w-3" />
              <span>City Suggestions</span>
            </div>
            <div className="space-y-1">
              {suggestions.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(city)}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2 transition-colors"
                >
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span>{city}</span>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    India
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
