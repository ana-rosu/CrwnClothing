import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import Button from "../Button/button.component";
import CartItem from "../CartItem/cart-item.component";
import {
  StyledCartDropdownContainer,
  StyledCartItems,
  StyledEmptyMessage,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckoutClick = () => {
    navigate("/checkout");
    dispatch(setIsCartOpen(false));
  };
  return (
    <StyledCartDropdownContainer>
      <StyledCartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <StyledEmptyMessage>Your cart is empty!</StyledEmptyMessage>
        )}
      </StyledCartItems>
      <Button onClick={handleCheckoutClick}>Checkout</Button>
    </StyledCartDropdownContainer>
  );
};

export default CartDropdown;
