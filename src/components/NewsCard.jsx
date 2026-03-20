import React from 'react';

const NewsCard = ({ article, compact = false }) => {
  const title = article?.title;
  const description = article?.description;
  const image = article?.image;
  const publishedAt = article?.publishedAt;
  const source = article?.source;
  const category = article?.category;
  const url = article?.url;
  
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : '';

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
    e.target.onerror = null;
  };

  if (compact) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="news-card compact">
        <div className="news-card-img-wrapper-compact">
          <img 
            src={image || 'https://via.placeholder.com/100x100?text=News'} 
            alt={title} 
            className="news-card-img-compact" 
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="news-card-content-compact">
          <span className="news-card-category-compact">{category}</span>
          <h4 className="news-card-title-compact" title={title}>{title}</h4>
          <span className="news-card-date-compact">{formattedDate}</span>
        </div>
      </a>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="news-card">
      <div className="news-card-img-wrapper">
        <img 
          src={image || 'https://via.placeholder.com/400x250?text=No+Image'} 
          alt={title} 
          className="news-card-img" 
          onError={handleImageError}
          loading="lazy"
        />
        <span className="news-card-category-badge">{category}</span>
      </div>
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-desc">{description?.substring(0, 90)}...</p>
        <div className="news-card-meta">
          <span className="news-card-source">{source?.name || 'Unknown Source'}</span>
          <span className="news-card-date">{formattedDate}</span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
