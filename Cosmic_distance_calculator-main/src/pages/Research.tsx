import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { getNASANews } from '../services/nasa';
import { Calendar, ExternalLink } from 'lucide-react';

export function Research() {
  const { data: news, isLoading } = useQuery('nasa-news', getNASANews);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 h-40 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-8"
    >
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Latest Space Research</h1>
      
      <div className="grid gap-6">
        {news?.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {article.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-navy transition-colors"
              >
                Read More <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}