import React, { useState, useEffect } from 'react';
import { Search, Tag } from 'lucide-react';
import { offers } from '../data/mockData';
import { fetchAPI } from '../api';
import RestaurantCard from '../components/RestaurantCard';
import '../styles/Home.css';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchAPI('/restaurants');
        setRestaurants(data);
      } catch (error) {
        console.error("Failed to load restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(res => 
    res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading-container">Loading deliciousness...</div>;
  }

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Order Food From Your Favorite Restaurants</h1>
          <p>Fresh, hot, and delicious food delivered to your door in minutes.</p>
          
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search for restaurants or cuisines..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="offers-section py-8">
        <div className="section-header flex items-center gap-2 mb-6">
          <Tag className="primary-icon" size={24} />
          <h2>Special Offers For You</h2>
        </div>
        <div className="offers-container flex gap-6 overflow-x-auto pb-4">
          {offers.map(offer => (
            <div key={offer.id} className="offer-banner glass flex-shrink-0">
              <div className="offer-info">
                <span className="discount">{offer.discount}</span>
                <h3>{offer.code}</h3>
                <p>{offer.description}</p>
              </div>
              <div className="offer-action">
                <button 
                  className="copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(offer.code);
                    alert(`Code ${offer.code} copied to clipboard!`);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurant List */}
      <section className="restaurant-list py-8">
        <div className="section-header flex justify-between items-center mb-8">
          <h2>Popular Restaurants</h2>
          <span className="res-count">{filteredRestaurants.length} restaurants found</span>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No restaurants found matching your search.</h3>
            <p>Try searching for something else!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
