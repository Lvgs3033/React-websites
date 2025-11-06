
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: delay
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "glass-morphism rounded-xl overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex justify-between items-center p-6", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-gradient">{children}</h2>
  );
}

export function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-stock-purple text-2xl">{children}</div>
  );
}
