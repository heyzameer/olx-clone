import React from 'react';
import './Banner.css';
import Arrow from '../../assets/Arrow';

function Banner() {
  return (
    <div className="banner-container">
      <div className="banner-wrapper">
        {/* Menu Bar Section */}
        <div className="menu-bar">
          <div className="category-menu">
            <span>ALL CATEGORIES</span>
            <Arrow />
          </div>
          <div className="quick-options">
            {[
              'Cars',
              'Motorcycles',
              'Mobile Phones',
              'For Sale: Houses & Apartments',
              'Scooters',
              'Commercial & Other Vehicles',
              'For Rent: Houses & Apartments',
            ].map((option, index) => (
              <span key={index}>{option}</span>
            ))}
          </div>
        </div>
        {/* Banner Image Section */}
        <div className="banner-image">
          <img
            src="../../../Images/banner copy.png"
            alt="Promotional Banner"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
