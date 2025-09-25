export function storageFav() {
  try {
    const heartData = localStorage.getItem("favourites");
    if (!heartData) return [];
    const store = JSON.parse(heartData);
    return Array.isArray(store) ? store : [];
  } catch (error) {
    console.error(`error parsing favourites`, error);
    return [];
  }
}
export function storageCart() {
  try {
    const cartData = localStorage.getItem("cart");
    if (!cartData) return [];
    const store = JSON.parse(cartData);
    return Array.isArray(store) ? store : [];
  } catch (error) {
    console.error(`error parsing carts`, error);
    return [];
  }
}
