import { useContext } from "react";
import { CartContext } from "../../contexts/cartItems.context";

import {
  StyledCartIconContainer,
  StyledShoppingIcon,
  StyledItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <StyledCartIconContainer onClick={toggleIsCartOpen}>
      <StyledShoppingIcon className="shopping-icon"></StyledShoppingIcon>
      <StyledItemCount className="item-count">{cartCount}</StyledItemCount>
    </StyledCartIconContainer>
  );
};

export default CartIcon;
