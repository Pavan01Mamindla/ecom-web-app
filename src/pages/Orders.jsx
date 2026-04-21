import React, { useEffect, useState } from 'react';
import { Package, Calendar, Clock, ChevronRight } from 'lucide-react';
import { fetchAPI } from '../api';
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchAPI('/orders/me');
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch order history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) return <div className="loading text-center py-20">Loading your orders...</div>;

  if (error) return <div className="error text-center py-20">{error}</div>;

  return (
    <div className="orders-page fade-in">
      <div className="orders-container">
        <h1 className="mb-8 flex items-center gap-3">
          <Package size={32} className="primary-icon" />
          Your Order History
        </h1>

        {orders.length === 0 ? (
          <div className="no-orders glass">
            <h2>No orders yet!</h2>
            <p>You haven't placed any orders with FoodKart yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card glass">
                <div className="order-header flex justify-between items-center">
                  <div className="header-info">
                    <span className="order-id">Order #{order.id}</span>
                    <div className="order-date flex items-center gap-2 mt-1">
                      <Calendar size={14} />
                      <span>{new Date(order.created_at).toLocaleDateString()}</span>
                      <span className="mx-2">|</span>
                      <Clock size={14} />
                      <span>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  <span className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-items">
                  {order.items && order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-info">
                        <span className="item-name">{item.menu_item?.name || `Item #${item.menu_item_id}`}</span>
                        <span className="item-qty">Quantity: {item.quantity}</span>
                      </div>
                      <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <span className="total-label">Grand Total Paid</span>
                  <span className="total-amount">₹{order.total_amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
