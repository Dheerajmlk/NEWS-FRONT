import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/api';
import Navbar from '../components/Navbar';
import FeaturedNews from '../components/FeaturedNews';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import NewsSection from '../components/NewsSection';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { FileQuestion } from 'lucide-react';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  
  const [filters, setFilters] = useState({
    category: 'general',
    q: '',
    page: 1,
    sort: 'latest',
    lang: '',
    country: ''
  });

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Only send params if they exist (no empty strings)
        const params = {
          limit: 10,
          page: filters.page,
          sort: filters.sort
        };
        
        if (filters.q?.trim()) {
          params.q = filters.q.trim();
        } else if (filters.category?.trim()) {
          // If search exists -> ignore category. If category empty -> do not send
          params.category = filters.category;
        }

        if (filters.lang?.trim()) params.lang = filters.lang;
        if (filters.country?.trim()) params.country = filters.country;

        const res = await fetchNews(params);
        setArticles(res.data || []);
        setTotalPages(res.totalPages || 1);
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [filters]);

  const handleFilterChange = (updates) => {
    setFilters(prev => {
      const newFilters = { ...prev, ...updates };
      // Reset page if anything other than page changes
      if (!updates.page) {
        newFilters.page = 1;
      }
      return newFilters;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query) => {
    handleFilterChange({ q: query }); // Keep category in state but API call ignores it
  };

  const handleCategorySelect = (cat) => {
    handleFilterChange({ category: cat, q: '' });
  };

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const latestArticles = articles.length > 1 ? articles.slice(1) : [];

  return (
    <div className="app-container">
      <Navbar 
        onSearch={handleSearch} 
        onCategorySelect={handleCategorySelect} 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <main className="main-content">
        {filters.page === 1 && !filters.q && !filters.lang && !filters.country && featuredArticle && (
          <div className="featured-wrapper">
            <FeaturedNews article={featuredArticle} />
          </div>
        )}

        <div className="layout-2-col">
          <div className="content-left">
            <h2 className="section-title">
              <span>{filters.q ? `Search Results: ${filters.q}` : 'Latest News'}</span>
            </h2>
            
            {loading ? (
              <Loader />
            ) : error ? (
              <div className="error-msg">{error}</div>
            ) : latestArticles.length > 0 ? (
              <div className="latest-articles-list">
                {latestArticles.map(article => (
                  <NewsCard key={article?._id || article?.url} article={article} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <FileQuestion size={60} className="empty-icon" />
                <p>No news found</p>
                <span>Try adjusting your filters or search term.</span>
              </div>
            )}

            {!loading && totalPages > 1 && (
              <Pagination 
                currentPage={filters.page} 
                totalPages={totalPages} 
                onPageChange={(p) => handleFilterChange({ page: p })} 
              />
            )}

            {filters.page === 1 && !filters.q && Object.keys(filters).length && filters.category === 'general' && (
              <div className="home-sections">
                <NewsSection title="Technology" category="technology" />
                <NewsSection title="Sports" category="sports" />
                <NewsSection title="Business" category="business" />
              </div>
            )}
          </div>

          <div className="content-right">
            <Sidebar />
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} NewsProj. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
