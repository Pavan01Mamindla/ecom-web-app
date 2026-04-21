import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import '../styles/RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card fade-in">
      <div className="card-image">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60'; // Default food image fallback
          }}
        />
        {restaurant.offer && <div className="offer-tag">{restaurant.offer}</div>}
        <div className="delivery-time">
          <Clock size={14} />
          <span>{restaurant.delivery_time}</span>
        </div>
      </div>
      <div className="card-content">
        <div className="card-header flex justify-between items-center">
          <h3>{restaurant.name}</h3>
          <div className="rating flex items-center gap-1">
            <Star size={16} fill="var(--accent)" color="var(--accent)" />
            <span>{restaurant.rating}</span>
          </div>
        </div>
        <p className="cuisine">{restaurant.cuisine}</p>
        <Link to={`/restaurant/${restaurant.id}`} className="view-menu-btn">
          View Menu
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
