import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchItem } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Details.css";

export default function Details() {
  const { id } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("products") || "[]");
    const localItem = local.find(p => String(p.id) === String(id));
    if (localItem) {
      setItem(localItem);
    } else {
      fetchItem(id).then(setItem).catch(() => setError("Product not found"));
    }
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFav(favs.some(p => String(p.id) === String(id)));
  }, [id]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFav) {
      localStorage.setItem("favorites", JSON.stringify(favs.filter(p => String(p.id) !== String(id))));
      setIsFav(false);
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favs, item]));
      setIsFav(true);
    }
  };

  if (error) return <div className="state-error">{error}</div>;
  if (!item) return <div className="state-loading">Loading...</div>;

  return (
    <div className="details-page">
      <Link to="/list" className="details-back">← Back to Products</Link>

      <div className="details-card">
        <div className="details-img-wrap">
          <img src={item.thumbnail || item.image} alt={item.title} />
        </div>

        <div className="details-info">
          <span className="details-category">{item.category}</span>
          <h1 className="details-title">{item.title}</h1>
          <p className="details-price">${item.price}</p>
          {item.rating && (
            <p className="details-rating">⭐ {item.rating.rate} ({item.rating.count} reviews)</p>
          )}
          <p className="details-description">{item.description}</p>

          <div className="details-actions">
            {user && (
              <button onClick={toggleFavorite} className={`btn ${isFav ? "btn-danger" : "btn-secondary"}`}>
                {isFav ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}