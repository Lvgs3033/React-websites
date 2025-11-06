import { motion } from 'framer-motion';

export function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-8"
    >
      <h1 className="text-4xl font-bold mb-6 text-gray-800">About Cosmic Calculator</h1>
      
      <div className="prose max-w-none text-gray-600">
        <p className="mb-4">
          The Cosmic Calculator is an educational tool designed to help understand the vast distances
          between celestial objects in our universe. Using data from NASA and other astronomical sources,
          we provide accurate calculations of distances between various cosmic objects.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Our Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Real-time distance calculations between celestial objects</li>
          <li>Integration with NASA's APIs for accurate astronomical data</li>
          <li>Interactive 3D visualizations of space objects</li>
          <li>Daily astronomy picture and explanation from NASA</li>
          <li>Latest space research and discoveries</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">How It Works</h2>
        <p className="mb-4">
          Our calculator uses light-years as the primary unit of measurement, which is the distance
          light travels in one year (approximately 9.46 trillion kilometers). For closer objects,
          we also provide distances in Astronomical Units (AU), where 1 AU is the average distance
          between Earth and the Sun.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Data Sources</h2>
        <p className="mb-4">
          We source our data from various reliable astronomical databases and APIs, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>NASA's Astronomy Picture of the Day (APOD) API</li>
          <li>NASA's Space Science Database</li>
          <li>International Astronomical Union data</li>
        </ul>
      </div>
    </motion.div>
  );
}