import { useEffect, useState } from "react";
import { fetchItems } from "../services/api";

export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const deleteItem = (id) => {
    const local = JSON.parse(localStorage.getItem("products") || "[]");
    const isLocal = local.find(p => String(p.id) === String(id));
    if (isLocal) {
      const updated = local.filter(p => String(p.id) !== String(id));
      localStorage.setItem("products", JSON.stringify(updated));
      setData(prev => prev.filter(item => String(item.id) !== String(id)));
    }
  };

  return { data, loading, error, deleteItem };
}