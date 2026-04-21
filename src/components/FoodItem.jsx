import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/FoodItem.css';

const FoodItem = ({ item }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  
  const cartItem = cartItems.find(i => i.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="food-item glass flex items-center gap-4">
      <div className="food-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="food-info flex-grow">
        <h4>{item.name}</h4>
        <p className="food-price">₹{item.price}</p>
      </div>
      <div className="food-actions">
        {quantity > 0 ? (
          <div className="quantity-controls flex items-center gap-4">
            <button 
              onClick={() => updateQuantity(item.id, -1)}
              className="qty-btn minus"
            >
              <Minus size={18} />
            </button>
            <span className="qty-value">{quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, 1)}
              className="qty-btn plus"
            >
              <Plus size={18} />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => addToCart(item)}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
