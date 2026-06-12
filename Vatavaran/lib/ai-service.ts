const INDIAN_CITIES = [
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
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan",
  "Vasai",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Allahabad",
  "Ranchi",
  "Howrah",
  "Coimbatore",
  "Jabalpur",
  "Gwalior",
  "Vijayawada",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kota",
  "Chandigarh",
  "Guwahati",
  "Solapur",
  "Hubli",
  "Mysore",
  "Tiruchirappalli",
  "Bareilly",
  "Aligarh",
  "Tiruppur",
  "Gurgaon",
  "Moradabad",
  "Jalandhar",
  "Bhubaneswar",
  "Salem",
  "Mira-Bhayandar",
  "Warangal",
  "Guntur",
  "Bhiwandi",
  "Saharanpur",
  "Gorakhpur",
  "Bikaner",
  "Amravati",
  "Noida",
  "Jamshedpur",
  "Bhilai",
  "Cuttack",
  "Firozabad",
  "Kochi",
  "Nellore",
  "Bhavnagar",
  "Dehradun",
  "Durgapur",
  "Asansol",
  "Rourkela",
  "Nanded",
  "Kolhapur",
  "Ajmer",
  "Akola",
  "Gulbarga",
  "Jamnagar",
  "Ujjain",
  "Loni",
  "Siliguri",
  "Jhansi",
  "Ulhasnagar",
  "Jammu",
  "Sangli",
  "Mangalore",
  "Erode",
  "Belgaum",
  "Ambattur",
  "Tirunelveli",
  "Malegaon",
  "Gaya",
  "Jalgaon",
  "Udaipur",
]

export async function getAICitySuggestions(input: string): Promise<string[]> {
  try {
    if (!input || input.length < 2) {
      return ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"]
    }

    const lowerInput = input.toLowerCase().trim()

    // Exact matches
    const exactMatches = INDIAN_CITIES.filter((city) => city.toLowerCase() === lowerInput)
    if (exactMatches.length > 0) {
      return exactMatches.slice(0, 5)
    }

    // Starts with matches
    const startsWithMatches = INDIAN_CITIES.filter((city) => city.toLowerCase().startsWith(lowerInput))
    if (startsWithMatches.length > 0) {
      return startsWithMatches.slice(0, 5)
    }

    // Contains matches
    const containsMatches = INDIAN_CITIES.filter((city) => city.toLowerCase().includes(lowerInput))
    if (containsMatches.length > 0) {
      return containsMatches.slice(0, 5)
    }

    // Fuzzy matches for common misspellings
    const fuzzyMatches = INDIAN_CITIES.filter((city) => {
      const cityLower = city.toLowerCase()
      let matchCount = 0
      const minLength = Math.min(cityLower.length, lowerInput.length)

      for (let i = 0; i < minLength; i++) {
        if (cityLower[i] === lowerInput[i]) {
          matchCount++
        }
      }

      return matchCount / Math.max(cityLower.length, lowerInput.length) > 0.6
    })

    if (fuzzyMatches.length > 0) {
      return fuzzyMatches.slice(0, 5)
    }

    // Default popular cities
    return ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"]
  } catch (error) {
    console.log("Error in city suggestions:", error)
    return ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"]
  }
}

export async function getWeatherInsights(weatherData: any): Promise<string> {
  try {
    const temp = Math.round(weatherData.current.temp)
    const condition = weatherData.current.weather[0].description
    const humidity = weatherData.current.humidity
    const cityName = weatherData.location?.name || "the city"

    let insight = `Current conditions in ${cityName}: ${condition} with ${temp}°C. `

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
  } catch (error) {
    console.log("Error generating weather insights:", error)
    return "Weather conditions are looking good today. Stay comfortable and enjoy your day!"
  }
}
