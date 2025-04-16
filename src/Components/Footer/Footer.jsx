import React from 'react';
import './Footer.css';

function Footer() {
  const popularLocations = ['Kolkata', 'Mumbai', 'Chennai', 'Pune'];
  const aboutUsLinks = ['About OLX Group', 'Careers', 'Contact Us', 'OLXPeople'];
  const olxLinks = ['Help', 'Sitemap', 'Legal & Privacy information'];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <FooterSection heading="POPULAR LOCATIONS" items={popularLocations} />
        <FooterSection heading="ABOUT US" items={aboutUsLinks} />
        <FooterSection heading="OLX" items={olxLinks} />
      </div>
      <div className="footer-bottom">
        <p>Other Countries: Pakistan - South Africa - Indonesia</p>
        <p>Free Classifieds in India. © 2006-2021 OLX</p>
      </div>
    </footer>
  );
}

function FooterSection({ heading, items }) {
  return (
    <div className="footer-section">
      <h4 className="footer-heading">{heading}</h4>
      <ul className="footer-list">
        {items.map((item, index) => (
          <li key={index} className="footer-list-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
