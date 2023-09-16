// PLAIN CART CONTEXT WITHOUT REDUCERS
// we are exporting out from this context different methods that a user can fire in order to update the current cart items. whenever these items get updated, we also update the cart count and the cart total using useEffect with dependecies
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

const decrementCartItem = (cartItems, productToDecrement) => {
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrement.id && cartItem.quantity > 1
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};
export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
  addItemToCart: () => null,
  decrementItemFromCart: () => null,
  removeItemFromCart: () => null,
  setIsCartOpen: () => null,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const decrementItemFromCart = (productToDecrement) => {
    setCartItems(decrementCartItem(cartItems, productToDecrement));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + +cartItem.quantity * +cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    addItemToCart,
    decrementItemFromCart,
    removeItemFromCart,
    setIsCartOpen,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// custom hook
// export function useCartContext() {
//   return useContext(CartContext);
// }
