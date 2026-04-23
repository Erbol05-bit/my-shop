import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchItem, updateProduct } from "../services/api";
import "./Form.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", price: "", category: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("products") || "[]");
    const localItem = local.find(p => String(p.id) === String(id));
    if (localItem) {
      setForm({ title: localItem.title, price: localItem.price, category: localItem.category, description: localItem.description });
      setLoading(false);
    } else {
      fetchItem(id)
        .then(item => {
          setForm({ title: item.title, price: item.price, category: item.category, description: item.description });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.price) newErrors.price = "Price is required";
    else if (isNaN(form.price) || Number(form.price) <= 0) newErrors.price = "Must be a positive number";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setSaving(true);
    try {
      const local = JSON.parse(localStorage.getItem("products") || "[]");
      const isLocal = local.find(p => String(p.id) === String(id));
      if (isLocal) {
        const updated = local.map(p => String(p.id) === String(id) ? { ...p, ...form, price: Number(form.price) } : p);
        localStorage.setItem("products", JSON.stringify(updated));
      } else {
        await updateProduct(id, { ...form, price: Number(form.price) });
      }
      setSuccess(true);
      setTimeout(() => navigate("/list"), 1500);
    } catch {
      setErrors({ submit: "Failed to update product." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="state-loading">Loading...</div>;

  return (
    <div className="form-page">
      <div className="form-page-header">
        <h2>✏️ Edit Product</h2>
        <p>Update the product details below</p>
      </div>

      {success && <div className="alert-success" style={{ marginBottom: "16px" }}>✅ Updated! Redirecting...</div>}
      {errors.submit && <div className="alert-error" style={{ marginBottom: "16px" }}>{errors.submit}</div>}

      <div className="form-card">
        <div className="form-group">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange}
            placeholder="Product title" className={errors.title ? "error" : ""} />
          {errors.title && <span className="form-error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label>Price ($)</label>
          <input name="price" value={form.price} onChange={handleChange}
            placeholder="0.00" className={errors.price ? "error" : ""} />
          {errors.price && <span className="form-error">{errors.price}</span>}
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}
            className={errors.category ? "error" : ""}>
            <option value="">-- Select category --</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange}
            placeholder="Product description" className={errors.description ? "error" : ""} />
          {errors.description && <span className="form-error">{errors.description}</span>}
        </div>
        <button type="button" onClick={handleSubmit} disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}