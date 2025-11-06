
import { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/Card";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <PageContainer title="Contact Us">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gradient mb-6">Get In Touch</h2>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-secondary/50 p-4 rounded-lg border border-stock-purple/30 mb-6"
                >
                  <p className="text-center text-primary">Thank you for your message! We'll get back to you soon.</p>
                </motion.div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Message</label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-stock-purple focus:border-transparent outline-none resize-none"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-stock-purple text-white font-medium rounded-lg py-3 px-6 hover:bg-stock-purple/90 transition-colors flex items-center gap-2 disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="h-4 w-4" />
                </motion.button>
              </form>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gradient mb-4">Contact Information</h3>
              <div className="space-y-4">
                <ContactItem icon={<MapPin />} title="Address">
                  123 Financial Street, New York, NY 10001
                </ContactItem>
                
                <ContactItem icon={<Phone />} title="Phone">
                  +1 (555) 123-4567
                </ContactItem>
                
                <ContactItem icon={<Mail />} title="Email">
                  info@stocktracker.com
                </ContactItem>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gradient mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

function ContactItem({ 
  icon, 
  title, 
  children 
}: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode; 
}) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-stock-purple shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-muted-foreground text-sm">{children}</p>
      </div>
    </div>
  );
}

export default Contact;
