import React, { useContext, useState } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

function Header() {
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="brand-name">
          <OlxLogo />
        </div>
        <div className="place-search">
          <Search />
          <input type="text" placeholder="Search location..." />
          <Arrow />
        </div>
        <div className="product-search">
          <input type="text" placeholder="Find car, mobile phone, and more..." />
          <button className="search-button">
            <Search color="#ffffff" />
          </button>
        </div>
        <div className="language-toggle">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div className="login-section">
          {user ? (
            <div className="user-menu">
              <span onClick={() => setDropdownOpen(!dropdownOpen)} className="user-name">
                {user.displayName} ▼
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup" className="login-link">
              <span>Login</span>
            </Link>
          )}
        </div>
        <div className="sell-menu" aria-label="Sell your items">
  <div className="sell-menu-content">
    <SellButtonPlus />
    <Link
      to={user ? "/create" : "#"}
      onClick={(e) => {
        if (!user) {
          e.preventDefault(); // Prevent navigation
          toast.error('Login first to create a listing');
        }
      }}
      className="sell-link"
      aria-label="Create a new listing"
    >
      <span>SELL</span>
    </Link>
  </div>
</div>

      </div>
    </header>
  );
}

export default Header;
