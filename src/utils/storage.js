export const getLocalProducts = () => {
    return JSON.parse(localStorage.getItem("products") || "[]");
  };
  
  export const saveLocalProducts = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
  };
  
  export const getFavorites = () => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  };
  
  export const saveFavorites = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  
  export const isLocalProduct = (id) => {
    const local = getLocalProducts();
    return local.find(p => String(p.id) === String(id));
  };