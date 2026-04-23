import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find(u => u.email === email);
    if (exists) throw new Error("User with this email already exists");
    const role = email === "admin@admin.com" ? "admin" : "user";
    const newUser = { name, email, password, role };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    const userData = { name, email, role };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    const userData = { name: found.name, email: found.email, role: found.role };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}