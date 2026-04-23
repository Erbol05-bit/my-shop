import { useEffect, useState } from "react";
import { fetchItems, deleteProduct } from "../services/api";
import { Link } from "react-router-dom";
import "./Admin.css";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems()
      .then(items => {
        const local = JSON.parse(localStorage.getItem("products") || "[]");
        setProducts([...local, ...items]);
      })
      .catch(() => setError("Error loading products"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const local = JSON.parse(localStorage.getItem("products") || "[]");
    const isLocal = local.find(p => String(p.id) === String(id));
    if (isLocal) {
      const updated = local.filter(p => String(p.id) !== String(id));
      localStorage.setItem("products", JSON.stringify(updated));
      setProducts(products.filter(p => String(p.id) !== String(id)));
      return;
    }
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => String(p.id) !== String(id)));
    } catch {
      alert("Failed to delete");
    }
  };

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="state-loading">Loading...</div>;
  if (error) return <div className="state-error">{error}</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>🛠️ Admin Panel</h2>
        <p>Manage all products in the store</p>
      </div>

      <div className="admin-toolbar">
        <input
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Link to="/items/create" className="btn btn-primary">+ Add Product</Link>
      </div>

      <p className="admin-count">Showing {filtered.length} of {products.length} products</p>

      {filtered.length === 0 ? (
        <div className="state-empty">No products found.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.title}
                      className="admin-table-img"
                    />
                  </td>
                  <td className="admin-table-title">{item.title}</td>
                  <td>{item.category}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="admin-table-actions">
                      <Link to={`/details/${item.id}`} className="btn btn-secondary">View</Link>
                      <Link to={`/items/${item.id}/edit`} className="btn btn-secondary">Edit</Link>
                      <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}