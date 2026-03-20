import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Menu, X, Filter } from 'lucide-react';
import debounce from 'lodash.debounce';

const CATEGORIES = ['General', 'Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science'];

const Navbar = ({ onSearch, onCategorySelect, filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useMemo(
    () => debounce((query) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  // Cancel debounce on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleCategoryClick = (cat) => {
    onCategorySelect(cat.toLowerCase());
    setIsMobileMenuOpen(false);
    setSearchTerm('');
  };

  return (
    <header className="navbar-container">
      <div className="navbar-top">
        <div className="logo" onClick={() => handleCategoryClick('general')} style={{ cursor: 'pointer' }}>
          <h1>News<span>Proj</span></h1>
        </div>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search news..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="search-icon" size={20} />
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <nav className={`navbar-bottom ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="nav-controls">
          <ul className="category-menu">
            {CATEGORIES.map(cat => (
              <li key={cat}>
                <button 
                  className={`category-btn ${filters?.category === cat.toLowerCase() && !filters?.q ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          
          <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={18} /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="filters-bar">
            <select value={filters?.lang || ''} onChange={(e) => onFilterChange({ lang: e.target.value })}>
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
            
            <select value={filters?.country || ''} onChange={(e) => onFilterChange({ country: e.target.value })}>
              <option value="">All Countries</option>
              <option value="in">India</option>
              <option value="us">United States</option>
              <option value="gb">United Kingdom</option>
            </select>

            <select value={filters?.sort || 'latest'} onChange={(e) => onFilterChange({ sort: e.target.value })}>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
