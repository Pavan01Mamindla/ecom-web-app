import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User,LogOut,UtensilsCrossed,Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="container flex justify-between items-center h-full">
        <Link to="/" className="logo flex items-center gap-2">
          <UtensilsCrossed size={28} className="primary-icon" />
          <span className="logo-text">Food<span>Kart</span></span>
        </Link>

        <div className="nav-links flex items-center gap-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link">
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          {user ? (
            <div className="user-profile flex items-center gap-6">
              <Link to="/orders" className="nav-link flex items-center gap-2">
                <Package size={20} />
                <span>Orders</span>
              </Link>
              <div className="user-info flex items-center gap-2">
                <User size={20} />
                <span className="username">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn flex items-center gap-1">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-btns flex items-center gap-4">
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
