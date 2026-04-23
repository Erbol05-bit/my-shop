import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <div className="home-hero">
        <h1>Find the Best <span>Products</span></h1>
        <p>Discover thousands of items at great prices. Shop smarter, live better.</p>
        <div className="home-hero-btns">
          <Link to="/list" className="btn btn-primary">Browse Products</Link>
          {!user && <Link to="/register" className="btn btn-secondary">Create Account</Link>}
        </div>
      </div>

      <div className="home-features">
        <h2>Why Choose Us?</h2>
        <div className="home-features-grid">
          <div className="home-feature-card">
            <div className="home-feature-icon">🚀</div>
            <h3>Fast Delivery</h3>
            <p>Get your orders delivered quickly and safely to your doorstep.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">💎</div>
            <h3>Quality Products</h3>
            <p>Every product is carefully selected to meet the highest standards.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">🔒</div>
            <h3>Secure Payments</h3>
            <p>Your payment information is always safe and encrypted.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">🎧</div>
            <h3>24/7 Support</h3>
            <p>Our support team is always ready to help you anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}