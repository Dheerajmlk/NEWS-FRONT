import React from 'react';

const FeaturedNews = ({ article }) => {
  if (!article) return null;

  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="featured-news">
      <img 
        src={article.image || 'https://via.placeholder.com/1200x600?text=Featured'} 
        alt={article.title} 
        className="featured-img" 
        onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x600?text=Featured'; e.target.onerror = null; }}
        loading="lazy"
      />
      <div className="featured-overlay">
        <span className="featured-category">{article.category}</span>
        <h1 className="featured-title">{article.title}</h1>
        <div className="featured-meta">
          <span className="featured-source">{article?.source?.name}</span>
          <span className="featured-dot">&bull;</span>
          <span className="featured-date">{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </a>
  );
};

export default FeaturedNews;
