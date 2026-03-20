import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/api';
import NewsCard from './NewsCard';
import Loader from './Loader';

const NewsSection = ({ title, category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const res = await fetchNews({ category, limit: 4, sort: 'latest' });
        setArticles(res.data || []);
      } catch (error) {
        console.error(`Error fetching ${category} news`, error);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, [category]);

  if (loading) return <Loader />;
  if (!articles || articles.length === 0) return null;

  return (
    <div className="news-section">
      <h2 className="section-title">
        <span>{title}</span>
      </h2>
      <div className="news-grid">
        {articles.map(article => (
          <NewsCard key={article._id || article.url} article={article} />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
