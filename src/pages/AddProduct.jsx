import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", price: "", category: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setLoading(true);
    try {
      const newItem = {
        id: Date.now(),
        ...form,
        price: Number(form.price),
        image: "https://fakestoreapi.com/img/81fAn1hw2zL._AC_UY879_.jpg",
      };
      const existing = JSON.parse(localStorage.getItem("products") || "[]");
      localStorage.setItem("products", JSON.stringify([newItem, ...existing]));
      setSuccess(true);
      setTimeout(() => navigate("/list"), 1500);
    } catch {
      setErrors({ submit: "Failed to create product. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <h2>➕ Add Product</h2>
        <p>Fill in the details to add a new product</p>
      </div>

      {success && <div className="alert-success" style={{ marginBottom: "16px" }}>✅ Product created! Redirecting...</div>}
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
        <button type="button" onClick={handleSubmit} disabled={loading} className="btn btn-primary">
          {loading ? "Creating..." : "Add Product"}
        </button>
      </div>
    </div>
  );
}