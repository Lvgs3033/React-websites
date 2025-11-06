import { Link } from 'react-router-dom';
import { Rocket, Home, Info, Search } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-navy text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="w-6 h-6" />
          <span className="text-xl font-bold">Cosmic Calculator</span>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link to="/about" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Info className="w-5 h-5" />
            <span>About</span>
          </Link>
          <Link to="/research" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
            <span>Research</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}