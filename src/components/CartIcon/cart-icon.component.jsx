import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.slice";
import {
  StyledCartIconContainer,
  StyledShoppingIcon,
  StyledItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <StyledCartIconContainer onClick={toggleIsCartOpen}>
      <StyledShoppingIcon className="shopping-icon"></StyledShoppingIcon>
      <StyledItemCount className="item-count">{cartCount}</StyledItemCount>
    </StyledCartIconContainer>
  );
};

export default CartIcon;
