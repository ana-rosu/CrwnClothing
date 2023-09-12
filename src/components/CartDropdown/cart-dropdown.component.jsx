import Button from "../Button/button.component";
import CartItem from "../CartItem/cart-item.component";
import { CartContext } from "../../contexts/cartItems.context";
import "./cart-dropdown.styles.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const handleCheckoutClick = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <p class="empty-message">Your cart is empty!</p>
        )}
      </div>
      <Button onClick={handleCheckoutClick}>Checkout</Button>
    </div>
  );
};

export default CartDropdown;
