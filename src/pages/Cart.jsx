import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Tag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fetchAPI } from '../api';
import '../styles/Cart.css';

const Cart = () => {
  const { 
    cartItems, removeFromCart, updateQuantity, cartTotal, 
    applyPromoCode, removePromoCode, appliedPromo, discount 
  } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState({ type: '', text: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const tax = (cartTotal - discount) * 0.18; // Tax after discount
  const grandTotal = cartTotal - discount + tax;

  const handleApplyPromo = () => {
    if (!promoInput) return;
    const result = applyPromoCode(promoInput);
    setPromoMessage({ type: result.success ? 'success' : 'error', text: result.message });
    if (result.success) setPromoInput('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart fade-in text-center">
        <div className="empty-cart-content glass py-12 px-8">
          <ShoppingBag size={80} className="text-muted mb-6 mx-auto" />
          <h2>Your cart is empty</h2>
          <p className="mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="primary-btn">Start Ordering</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page fade-in">
      <h1 className="mb-8">Your Cart</h1>
      
      <div className="cart-container flex flex-col lg:flex-row gap-8">
        <div className="cart-items flex-grow">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item glass flex items-center gap-6 mb-4">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details flex-grow">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price}</p>
              </div>
              <div className="item-actions flex items-center gap-6">
                <div className="quantity-controls flex items-center gap-4">
                  <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn minus">
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn plus">
                    <Plus size={16} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary glass">
          <h2>Order Summary</h2>
          <div className="summary-details mt-6">
            <div className="summary-row flex justify-between mb-4">
              <span>Item Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            {appliedPromo ? (
              <div className="summary-row flex justify-between mb-4 discount-row">
                <span className="flex items-center gap-1">
                  <Tag size={14} />
                  Promo ({appliedPromo.code})
                  <button onClick={removePromoCode} className="remove-promo"><X size={12} /></button>
                </span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            ) : (
              <div className="promo-input-section mb-6">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter Promo Code" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button onClick={handleApplyPromo}>Apply</button>
                </div>
                {promoMessage.text && (
                  <p className={`promo-msg ${promoMessage.type}`}>{promoMessage.text}</p>
                )}
              </div>
            )}

            <div className="summary-row flex justify-between mb-4">
              <span>Taxes (18% GST)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row flex justify-between mb-4">
              <span>Delivery Charges</span>
              <span className="success-text">FREE</span>
            </div>
            <div className="summary-divider my-4"></div>
            <div className="summary-row flex justify-between grand-total">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/payment')} 
            className="checkout-btn mt-8"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
