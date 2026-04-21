import React, { useEffect } from 'react';
import { CheckCircle, Package, ArrowRight, ClipboardCheck } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const location = useLocation();
  const orderId = location.state?.orderId;
  
  // Create a copy of cart items for summary before clearing
  const orderSummary = [...cartItems];
  const orderTotal = cartTotal + (cartTotal * 0.18);

  useEffect(() => {
    // Clear cart on success page load
    clearCart();
  }, []);

  return (
    <div className="success-page fade-in">
      <div className="success-card glass mx-auto p-12 text-center">
        <div className="success-icon mb-6">
          <CheckCircle size={100} color="var(--success)" />
        </div>
        <h1>Order Successful!</h1>
        {orderId && (
          <div className="order-id-badge flex items-center justify-center gap-2 mb-2">
            <ClipboardCheck size={16} className="text-primary" />
            <span>Order ID: <strong>#{orderId}</strong></span>
          </div>
        )}
        <p className="subtitle">Thank you for ordering from FoodKart. Your food is being prepared.</p>

        <div className="order-summary-card mt-12 bg-white rounded-2xl p-8 text-left">
          <div className="summary-header flex items-center gap-2 mb-6 pb-4 border-b">
            <Package size={20} className="primary-icon" />
            <h3 className="font-bold">Order Summary</h3>
          </div>
          
          <div className="summary-items">
            {orderSummary.map(item => (
              <div key={item.id} className="summary-item flex justify-between mb-3">
                <span>{item.name} × {item.quantity}</span>
                <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-total pt-4 mt-4 border-t flex justify-between">
            <span className="font-bold">Total Paid</span>
            <span className="font-bold text-primary">₹{orderTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="actions mt-10">
          <Link to="/" className="home-btn flex items-center justify-center gap-2 mx-auto">
            <span>Back to Home</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
