import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Info, CheckCircle } from "lucide-react"
import type { DetailedWeatherData, AirQualityData } from "@/lib/types"

interface WeatherPrecautionsProps {
  weatherData: DetailedWeatherData
  airQuality?: AirQualityData | null
}

export default function WeatherPrecautions({ weatherData, airQuality }: WeatherPrecautionsProps) {
  const getPrecautions = () => {
    const precautions: Array<{
      type: "warning" | "info" | "success"
      title: string
      description: string
      icon: string
    }> = []

    const temp = weatherData.current.temp
    const humidity = weatherData.current.humidity
    const uvi = weatherData.current.uvi
    const windSpeed = weatherData.current.wind_speed * 3.6 // Convert to km/h
    const condition = weatherData.current.weather[0].main.toLowerCase()

    // Temperature-based precautions
    if (temp > 40) {
      precautions.push({
        type: "warning",
        title: "Extreme Heat Warning",
        description:
          "Stay indoors during peak hours (11 AM - 4 PM). Drink plenty of water and wear light-colored, loose-fitting clothes.",
        icon: "fa-temperature-high",
      })
    } else if (temp > 35) {
      precautions.push({
        type: "warning",
        title: "High Temperature Alert",
        description: "Avoid prolonged outdoor activities. Stay hydrated and seek shade when possible.",
        icon: "fa-sun",
      })
    } else if (temp < 10) {
      precautions.push({
        type: "info",
        title: "Cold Weather Advisory",
        description: "Wear warm clothing in layers. Protect exposed skin and stay dry.",
        icon: "fa-snowflake",
      })
    }

    // Humidity-based precautions
    if (humidity > 80) {
      precautions.push({
        type: "info",
        title: "High Humidity",
        description: "Expect discomfort and slower evaporation of sweat. Stay in well-ventilated areas.",
        icon: "fa-droplet",
      })
    }

    // UV Index precautions
    if (uvi > 8) {
      precautions.push({
        type: "warning",
        title: "Very High UV Index",
        description: "Use SPF 30+ sunscreen, wear protective clothing, and avoid sun exposure between 10 AM - 4 PM.",
        icon: "fa-sun",
      })
    } else if (uvi > 6) {
      precautions.push({
        type: "info",
        title: "High UV Index",
        description: "Use sunscreen and wear a hat when outdoors for extended periods.",
        icon: "fa-sun",
      })
    }

    // Wind-based precautions
    if (windSpeed > 50) {
      precautions.push({
        type: "warning",
        title: "Strong Wind Warning",
        description: "Secure loose objects. Avoid outdoor activities and be cautious while driving.",
        icon: "fa-wind",
      })
    } else if (windSpeed > 30) {
      precautions.push({
        type: "info",
        title: "Windy Conditions",
        description: "Be cautious of flying debris. Secure outdoor furniture and decorations.",
        icon: "fa-wind",
      })
    }

    // Weather condition-based precautions
    if (condition.includes("rain") || condition.includes("drizzle")) {
      precautions.push({
        type: "info",
        title: "Rainy Weather",
        description: "Carry an umbrella. Drive carefully and watch for waterlogged areas.",
        icon: "fa-cloud-rain",
      })
    }

    if (condition.includes("thunderstorm")) {
      precautions.push({
        type: "warning",
        title: "Thunderstorm Alert",
        description: "Stay indoors. Avoid using electrical appliances and stay away from windows.",
        icon: "fa-cloud-bolt",
      })
    }

    if (condition.includes("fog") || condition.includes("mist")) {
      precautions.push({
        type: "warning",
        title: "Low Visibility",
        description: "Drive slowly with headlights on. Maintain safe following distance.",
        icon: "fa-smog",
      })
    }

    // Air quality precautions
    if (airQuality) {
      const aqi = airQuality.list[0].main.aqi
      if (aqi >= 4) {
        precautions.push({
          type: "warning",
          title: "Poor Air Quality",
          description: "Limit outdoor activities. People with respiratory conditions should stay indoors.",
          icon: "fa-lungs",
        })
      } else if (aqi >= 3) {
        precautions.push({
          type: "info",
          title: "Moderate Air Quality",
          description: "Sensitive individuals should consider limiting prolonged outdoor activities.",
          icon: "fa-lungs",
        })
      }
    }

    // If no specific precautions, add general advice
    if (precautions.length === 0) {
      precautions.push({
        type: "success",
        title: "Pleasant Weather Conditions",
        description: "Great weather for outdoor activities! Stay hydrated and enjoy the day.",
        icon: "fa-smile",
      })
    }

    return precautions
  }

  const precautions = getPrecautions()

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          Weather Precautions & Safety Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {precautions.map((precaution, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                precaution.type === "warning"
                  ? "bg-red-50 border-red-400"
                  : precaution.type === "info"
                    ? "bg-blue-50 border-blue-400"
                    : "bg-green-50 border-green-400"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {precaution.type === "warning" ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : precaution.type === "info" ? (
                    <Info className="h-5 w-5 text-blue-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <i className={`fas ${precaution.icon} text-sm`} />
                    <h3 className="font-semibold">{precaution.title}</h3>
                    <Badge
                      variant={
                        precaution.type === "warning"
                          ? "destructive"
                          : precaution.type === "info"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {precaution.type === "warning"
                        ? "High Priority"
                        : precaution.type === "info"
                          ? "Advisory"
                          : "Good"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{precaution.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
