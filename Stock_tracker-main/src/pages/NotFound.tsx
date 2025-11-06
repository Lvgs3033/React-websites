
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl font-display font-bold text-gradient mb-6">404</h1>
        <p className="text-2xl text-muted-foreground mb-8">Oops! Page not found</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-stock-purple text-white px-6 py-3 rounded-lg hover:bg-stock-purple/90 transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Return to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
