import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/CheckoutItem/checkout-item.component";

import "./checkout.styles.scss";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <span>Product</span>
        <span>Description</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Remove</span>
      </div>
      <div className="cartItems-container">
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <div className="total">Total: {cartTotal}$</div>
    </div>
  );
};
export default Checkout;
