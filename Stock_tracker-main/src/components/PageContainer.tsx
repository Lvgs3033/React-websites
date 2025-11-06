
import { motion } from "framer-motion";

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

export function PageContainer({ title, children }: PageContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 pt-28 pb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-12 text-center">
          {title}
        </h1>
        {children}
      </div>
    </motion.div>
  );
}
