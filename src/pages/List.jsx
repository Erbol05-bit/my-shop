import { useEffect, useState } from "react";
import { fetchItems, deleteProduct } from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./List.css";

export default function List() {
  const { user, isAdmin } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchItems()
      .then(items => {
        const local = JSON.parse(localStorage.getItem("products") || "[]");
        setData([...local, ...items]);
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
      setData(data.filter(item => String(item.id) !== String(id)));
      return;
    }
    try {
      await deleteProduct(id);
      setData(data.filter(item => item.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const categories = [...new Set(data.map(item => item.category).filter(Boolean))];

  let filtered = [...data];
  if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  if (category) filtered = filtered.filter(p => p.category === category);
  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "title-asc") filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "title-desc") filtered.sort((a, b) => b.title.localeCompare(a.title));

  const resetFilters = () => { setSearch(""); setCategory(""); setSort(""); };

  if (loading) return <div className="state-loading">Loading products...</div>;
  if (error) return <div className="state-error">{error}</div>;

  return (
    <div className="list-page">
      <div className="list-header">
        <h2>Products</h2>
        {user && <Link to="/items/create" className="btn btn-primary">+ Add Product</Link>}
      </div>

      <div className="list-filters">
        <input
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Sort by...</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title: A → Z</option>
          <option value="title-desc">Title: Z → A</option>
        </select>
        {(search || category || sort) && (
          <button onClick={resetFilters} className="btn btn-secondary">✕ Reset</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="state-empty">No products found.</div>
      ) : (
        <div className="list-grid">
          {filtered.map(item => {
            const local = JSON.parse(localStorage.getItem("products") || "[]");
            const isOwner = user && local.find(p => String(p.id) === String(item.id));
            const canEdit = isOwner || isAdmin;

            return (
              <div key={item.id} className="list-card">
                <img src={item.thumbnail || item.image} alt={item.title} className="list-card-img" />
                <div className="list-card-body">
                  <span className="list-card-category">{item.category}</span>
                  <h4 className="list-card-title">{item.title}</h4>
                  <p className="list-card-price">${item.price}</p>
                  <div className="list-card-actions">
                    <Link to={`/details/${item.id}`} className="btn btn-secondary">View</Link>
                    {canEdit && (
                      <>
                        <Link to={`/items/${item.id}/edit`} className="btn btn-secondary">Edit</Link>
                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}