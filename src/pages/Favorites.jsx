import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  const handleRemove = (id) => {
    const updated = favorites.filter(p => String(p.id) !== String(id));
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h2>❤️ My Favorites</h2>
        <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{favorites.length} items</span>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <p>No favorites yet.</p>
          <Link to="/list" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(item => (
            <div key={item.id} className="favorites-card">
              <img src={item.thumbnail || item.image} alt={item.title} className="favorites-card-img" />
              <div className="favorites-card-body">
                <span className="favorites-card-category">{item.category}</span>
                <h4 className="favorites-card-title">{item.title}</h4>
                <p className="favorites-card-price">${item.price}</p>
                <div className="favorites-card-actions">
                  <Link to={`/details/${item.id}`} className="btn btn-secondary">View</Link>
                  <button onClick={() => handleRemove(item.id)} className="btn btn-danger">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}