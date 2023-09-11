import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found, incremenet quantity & return new array with modififed cartItems
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //if not, return new array with with new cart item and an additional field of quantity
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => null,
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartCount: 0,
});

// export function useCartContext() {
//   return useContext(CartContext);
// }

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);
  const value = {
    cartItems,
    addItemToCart,
    cartCount,
    isCartOpen,
    setIsCartOpen,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
