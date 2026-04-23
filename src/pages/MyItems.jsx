import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MyItems() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("products") || "[]");
    setItems(local);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    const updated = items.filter(p => String(p.id) !== String(id));
    localStorage.setItem("products", JSON.stringify(updated));
    setItems(updated);
  };

  if (!user) return <p style={{ padding: "20px" }}>Please login first.</p>;

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>📦 My Products</h2>
        <Link to="/items/create">
          <button style={{ padding: "8px 16px", cursor: "pointer" }}>+ Add Product</button>
        </Link>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
          <p>You haven't added any products yet.</p>
          <Link to="/items/create">
            <button style={{ marginTop: "12px", padding: "10px 20px", cursor: "pointer" }}>Add your first product</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {items.map(item => (
            <div key={item.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px" }}>
              <img src={item.thumbnail || item.image} alt={item.title} style={{ width: "100%", height: "150px", objectFit: "contain" }} />
              <h4 style={{ fontSize: "13px", margin: "10px 0 6px" }}>{item.title}</h4>
              <p style={{ fontWeight: "bold", color: "#e44", margin: "0 0 10px" }}>${item.price}</p>
              <div style={{ display: "flex", gap: "6px" }}>
                <Link to={`/details/${item.id}`} style={{ flex: 1 }}>
                  <button style={{ width: "100%", padding: "6px", cursor: "pointer" }}>View</button>
                </Link>
                <Link to={`/items/${item.id}/edit`} style={{ flex: 1 }}>
                  <button style={{ width: "100%", padding: "6px", cursor: "pointer" }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(item.id)}
                  style={{ flex: 1, padding: "6px", cursor: "pointer", color: "red", border: "1px solid red", background: "none", borderRadius: "4px" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}