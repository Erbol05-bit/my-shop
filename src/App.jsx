import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import List from "./pages/List";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import MyItems from "./pages/MyItems";
import Favorites from "./pages/Favorites";
import Admin from "./pages/Admin";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <h2 style={{ fontSize: "72px", fontWeight: "800", color: "var(--green)", lineHeight: 1 }}>404</h2>
      <h3 style={{ fontSize: "22px", fontWeight: "700", margin: "16px 0 8px" }}>Page not found</h3>
      <p style={{ color: "var(--text-secondary)", marginBottom: "28px" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<List key={location.key} />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/items/create" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/items/:id/edit" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/my-items" element={<PrivateRoute><MyItems /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;