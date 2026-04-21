import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, DollarSign, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fetchAPI } from '../api';
import '../styles/Payment.css';

const Payment = () => {
  const { cartItems, cartTotal } = useCart();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const tax = cartTotal * 0.18;
  const grandTotal = cartTotal + tax;

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');

    if (parseFloat(amount) === parseFloat(grandTotal.toFixed(2))) {
      try {
        const orderData = {
          total_amount: grandTotal,
          items: cartItems.map(item => ({
            menu_item_id: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        };

        const response = await fetchAPI('/orders', {
          method: 'POST',
          body: JSON.stringify(orderData)
        });
        navigate('/order-success', { state: { orderId: response.id } });
      } catch (err) {
        setError("Failed to process order. Please try again.");
      }
    } else {
      setError(`Incorrect amount. Please enter exactly ₹${grandTotal.toFixed(2)}`);
    }
  };

  return (
    <div className="payment-page fade-in">
      <div className="payment-card glass mx-auto">
        <div className="payment-header text-center">
          <CreditCard size={40} className="primary-icon mb-4 mx-auto" />
          <h1>Payment Selection</h1>
          <p>Securely complete your order</p>
        </div>

        <div className="total-to-pay flex justify-between items-center mt-8 p-6 bg-white rounded-xl">
          <span className="label">Total Amount to Pay</span>
          <span className="amount">₹{grandTotal.toFixed(2)}</span>
        </div>

        <form onSubmit={handlePayment} className="payment-form mt-8">
          <div className="form-group">
            <label>Verify Amount</label>
            <div className="input-with-icon">
              <DollarSign size={18} />
              <input 
                type="number" 
                step="0.01"
                placeholder="Enter the total amount to confirm" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className="error-message mt-4">{error}</div>}

          <button type="submit" className="payment-btn mt-6 flex items-center justify-center gap-2">
            <ShieldCheck size={20} />
            <span>Pay Now</span>
          </button>
        </form>

        <div className="payment-security flex items-center justify-center gap-2 mt-8 text-muted text-sm">
          <ShieldCheck size={16} />
          <span>SSL Secured Payment Gateway</span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
