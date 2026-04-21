import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, Clock } from 'lucide-react';
import { fetchAPI } from '../api';
import FoodItem from '../components/FoodItem';
import '../styles/RestaurantMenu.css';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const data = await fetchAPI(`/restaurants/${id}`);
        setRestaurant(data);
      } catch (error) {
        console.error("Failed to load restaurant:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRestaurant();
  }, [id]);

  if (loading) return <div className="loading-container">Loading menu...</div>;

  if (!restaurant) {
    return (
      <div className="container py-8 text-center">
        <h2>Restaurant not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="restaurant-menu fade-in">
      <Link to="/" className="back-link flex items-center gap-1 mb-6">
        <ChevronLeft size={20} />
        <span>Back to Restaurants</span>
      </Link>

      <div className="restaurant-header glass mb-8">
        <div className="header-info flex flex-col md:flex-row gap-8 items-center">
          <div className="header-image">
            <img src={restaurant.image} alt={restaurant.name} />
          </div>
          <div className="header-text flex-grow">
            <h1>{restaurant.name}</h1>
            <p className="cuisine">{restaurant.cuisine}</p>
            <div className="header-meta flex gap-6 mt-4">
              <div className="meta-item flex items-center gap-2">
                <Star size={18} fill="var(--accent)" color="var(--accent)" />
                <span>{restaurant.rating} Rating</span>
              </div>
              <div className="meta-item flex items-center gap-2">
                <Clock size={18} />
                <span>{restaurant.delivery_time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <h2 className="mb-6">Menu</h2>
        <div className="food-items-list">
          {restaurant.menu_items?.map(item => (
            <FoodItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
