import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
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

// Dispatch actions

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const decrementItemFromCart = (cartItems, productToDecrement) => {
  const newCartItems = decrementCartItem(cartItems, productToDecrement);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
