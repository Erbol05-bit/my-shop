const BASE_URL = "https://dummyjson.com/products";

export const fetchItems = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error fetching data");
  const data = await res.json();
  return data.products;
};

export const fetchItem = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Error fetching item");
  return res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error creating product");
  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error updating product");
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error deleting product");
  return res.json();
};