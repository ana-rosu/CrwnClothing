import Button from "../Button/button.component";
import CartItem from "../CartItem/cart-item.component";
import { CartContext } from "../../contexts/cartItemsContext.context";
import "./cart-dropdown.styles.scss";
import { useContext } from "react";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <p class="empty-message">Your cart is empty!</p>
        )}
      </div>
      <Button>Checkout</Button>
    </div>
  );
};

export default CartDropdown;
