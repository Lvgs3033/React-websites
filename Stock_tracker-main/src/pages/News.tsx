
import { PageContainer } from "@/components/PageContainer";
import { Card } from "@/components/Card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const News = () => {
  return (
    <PageContainer title="Market News">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsData.map((news, index) => (
          <NewsCard key={index} news={news} index={index} />
        ))}
      </div>
    </PageContainer>
  );
};

interface NewsItem {
  image: string;
  date: string;
  title: string;
  excerpt: string;
}

const newsData: NewsItem[] = [
  {
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "May 15, 2023",
    title: "Fed Signals Potential Rate Cut by End of Year",
    excerpt: "Federal Reserve officials indicated they might consider cutting interest rates later this year if inflation continues to moderate."
  },
  {
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "May 14, 2023",
    title: "Tech Stocks Rally on AI Advancements",
    excerpt: "Technology shares surged amid growing optimism about artificial intelligence applications and new product announcements."
  },
  {
    image: "https://images.unsplash.com/photo-1579226905180-636b76d96082?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "May 12, 2023",
    title: "Global Markets React to Economic Data",
    excerpt: "International markets showed mixed reactions to the latest batch of economic indicators from major economies."
  }
];

function NewsCard({ news, index }: { news: NewsItem; index: number }) {
  return (
    <Card delay={0.1 * index}>
      <div className="group relative h-48 overflow-hidden">
        <motion.img 
          src={news.image} 
          alt={news.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
      </div>
      <div className="p-6">
        <p className="text-xs text-muted-foreground mb-2">{news.date}</p>
        <h3 className="text-xl font-semibold mb-3 line-clamp-2">{news.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{news.excerpt}</p>
        <a 
          href="#" 
          className="inline-flex items-center text-stock-purple hover:text-primary transition-colors gap-1 text-sm font-medium"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </Card>
  );
}

export default News;
