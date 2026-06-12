
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

export function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeLink, setActiveLink] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    // Extract the path without the leading slash
    const path = location.pathname.substring(1) || "dashboard";
    setActiveLink(path);
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // We're not actually toggling classes because we're always in dark mode for this app
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="transition-transform hover:scale-105 duration-300">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" isActive={activeLink === "dashboard"}>
              Dashboard
            </NavLink>
            <NavLink to="/news" isActive={activeLink === "news"}>
              News
            </NavLink>
            <NavLink to="/converter" isActive={activeLink === "converter"}>
              Converter
            </NavLink>
            <NavLink to="/about" isActive={activeLink === "about"}>
              About
            </NavLink>
            <NavLink to="/contact" isActive={activeLink === "contact"}>
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              to="/signin" 
              className="hidden md:block px-4 py-2 rounded-lg transition-all duration-300 hover:bg-secondary"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="hidden md:block px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-all duration-300 hover:bg-primary/80"
            >
              Sign Up
            </Link>
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary transition-all duration-300 hover:bg-secondary/80"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ to, isActive, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`relative px-1 py-2 font-medium text-base transition-colors duration-300 ${
        isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-fade-in rounded-full"></span>
      )}
    </Link>
  );
}
