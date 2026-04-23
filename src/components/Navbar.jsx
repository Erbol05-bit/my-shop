import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path ? "navbar-link active" : "navbar-link";

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">🛍️ MyShop</Link>

        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/list" className={isActive("/list")}>Products</Link>

        {user && (
          <>
            <Link to="/items/create" className={isActive("/items/create")}>Add Product</Link>
            <Link to="/my-items" className={isActive("/my-items")}>My Items</Link>
            <Link to="/favorites" className={isActive("/favorites")}>Favorites</Link>
            <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
          </>
        )}

        {isAdmin && (
          <Link to="/admin" className="navbar-admin-link">🛠️ Admin</Link>
        )}

        <div className="navbar-right">
          {user ? (
            <>
              <Link to="/profile" className="navbar-username">👤 {user.name}</Link>
              <button onClick={handleLogout} className="navbar-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}