import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    localStorage.setItem("user", JSON.stringify({ ...user, ...form }));
    setSuccess(true);
  };

  const handleDeleteAccount = () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <h2>👤 My Profile</h2>
      <p>Manage your personal information</p>

      {success && <div className="alert-success" style={{ marginBottom: "16px" }}>✅ Profile updated successfully!</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>

      <div className="profile-danger">
        <h4>Danger Zone</h4>
        <p>Once you delete your account, there is no going back.</p>
        <button onClick={handleDeleteAccount} className="btn btn-danger">Delete Account</button>
      </div>
    </div>
  );
}