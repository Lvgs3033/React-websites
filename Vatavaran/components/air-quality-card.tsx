import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind } from "lucide-react"
import type { AirQualityData } from "@/lib/types"

interface AirQualityCardProps {
  airQuality: AirQualityData
}

export default function AirQualityCard({ airQuality }: AirQualityCardProps) {
  const getAQILevel = (aqi: number) => {
    switch (aqi) {
      case 1:
        return { label: "Good", color: "bg-green-500", textColor: "text-green-700" }
      case 2:
        return { label: "Fair", color: "bg-yellow-500", textColor: "text-yellow-700" }
      case 3:
        return { label: "Moderate", color: "bg-orange-500", textColor: "text-orange-700" }
      case 4:
        return { label: "Poor", color: "bg-red-500", textColor: "text-red-700" }
      case 5:
        return { label: "Very Poor", color: "bg-purple-500", textColor: "text-purple-700" }
      default:
        return { label: "Unknown", color: "bg-gray-500", textColor: "text-gray-700" }
    }
  }

  const currentAQI = airQuality.list[0]
  const aqiLevel = getAQILevel(currentAQI.main.aqi)

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-blue-600" />
          Air Quality Index
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${aqiLevel.color} text-white text-2xl font-bold mb-2`}
            >
              {currentAQI.main.aqi}
            </div>
            <div className={`text-lg font-semibold ${aqiLevel.textColor}`}>{aqiLevel.label}</div>
            <p className="text-sm text-gray-600 mt-1">Overall Air Quality</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium text-gray-700">CO</div>
              <div className="text-lg font-bold">{currentAQI.components.co.toFixed(1)}</div>
              <div className="text-xs text-gray-500">μg/m³</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium text-gray-700">NO₂</div>
              <div className="text-lg font-bold">{currentAQI.components.no2.toFixed(1)}</div>
              <div className="text-xs text-gray-500">μg/m³</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium text-gray-700">O₃</div>
              <div className="text-lg font-bold">{currentAQI.components.o3.toFixed(1)}</div>
              <div className="text-xs text-gray-500">μg/m³</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium text-gray-700">PM2.5</div>
              <div className="text-lg font-bold">{currentAQI.components.pm2_5.toFixed(1)}</div>
              <div className="text-xs text-gray-500">μg/m³</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
