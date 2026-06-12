
import { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/Card";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would typically redirect after successful login
      console.log("Sign in successful", { email, password });
    }, 1500);
  };

  return (
    <PageContainer title="Sign In">
      <div className="max-w-md mx-auto">
        <Card>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-border bg-secondary/30 text-stock-purple focus:ring-stock-purple"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm text-stock-purple hover:text-primary transition-colors">
                Forgot password?
              </a>
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-stock-purple text-white font-medium rounded-lg py-3 hover:bg-stock-purple/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
              <LogIn className="h-4 w-4" />
            </motion.button>
            
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-stock-purple hover:text-primary transition-colors">
                Sign up
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SignIn;
