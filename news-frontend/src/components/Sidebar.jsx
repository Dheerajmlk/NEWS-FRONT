import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/api';
import NewsCard from './NewsCard';
import Loader from './Loader';
import { AlertCircle } from 'lucide-react';

const Sidebar = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrending = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchNews({ limit: 6, sort: 'latest', category: 'general' });
        setTrending(res.data || []);
      } catch (err) {
        console.error('Error fetching trending', err);
        setError('Failed to load trending news.');
      } finally {
        setLoading(false);
      }
    };
    getTrending();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-widget">
        <h3 className="sidebar-title">Trending / Latest</h3>
        <div className="sidebar-list">
          {loading ? (
             <Loader />
          ) : error ? (
            <div style={{ color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} /> {error}
            </div>
          ) : trending.length > 0 ? (
            trending.map(article => (
              <NewsCard key={article?._id || article?.url} article={article} compact={true} />
            ))
          ) : (
            <p className="no-trending">No trending news right now.</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
