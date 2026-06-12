
import { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/Card";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when editing fields
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Here you would typically redirect after successful registration
      console.log("Sign up successful", formData);
    }, 1500);
  };

  return (
    <PageContainer title="Create Account">
      <div className="max-w-md mx-auto">
        <Card>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 rounded border-border bg-secondary/30 text-stock-purple focus:ring-stock-purple"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-muted-foreground">
                I agree to the <a href="#" className="text-stock-purple hover:text-primary transition-colors">Terms of Service</a> and <a href="#" className="text-stock-purple hover:text-primary transition-colors">Privacy Policy</a>
              </label>
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-stock-purple text-white font-medium rounded-lg py-3 hover:bg-stock-purple/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
              <UserPlus className="h-4 w-4" />
            </motion.button>
            
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-stock-purple hover:text-primary transition-colors">
                Sign in
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SignUp;
