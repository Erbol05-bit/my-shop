import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const [myItemsCount, setMyItemsCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("products") || "[]");
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setMyItemsCount(local.length);
    setFavoritesCount(favorites.length);
  }, []);

  return (
    <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>👋 Welcome back, {user?.name}!</h2>
      <p style={{ color: "#888", marginBottom: "32px" }}>{user?.email}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", textAlign: "center" }}>
          <h3 style={{ fontSize: "32px", margin: "0 0 8px" }}>{myItemsCount}</h3>
          <p style={{ color: "#888", margin: 0 }}>My Products</p>
        </div>
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", textAlign: "center" }}>
          <h3 style={{ fontSize: "32px", margin: "0 0 8px" }}>{favoritesCount}</h3>
          <p style={{ color: "#888", margin: 0 }}>Favorites</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3>Quick Links</h3>
        <Link to="/list">🛍️ Browse Products</Link>
        <Link to="/items/create">➕ Add New Product</Link>
        <Link to="/my-items">📦 My Products</Link>
        <Link to="/favorites">❤️ My Favorites</Link>
        <Link to="/profile">👤 Edit Profile</Link>
      </div>
    </div>
  );
}