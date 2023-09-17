import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  decrementItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const decrementItemHandler = () =>
    dispatch(decrementItemFromCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <img src={imageUrl} alt={name} />
      <div className="checkout-item-description">
        <span>{name}</span>
        <div className="quantity-container">
          <div className="arrow" onClick={decrementItemHandler}>
            &#10094;
          </div>
          <div className="value">{quantity}</div>
          <div className="arrow" onClick={addItemHandler}>
            &#10095;
          </div>
        </div>
        <span>{price}$</span>
        <div className="remove-button" onClick={removeItemHandler}>
          &#10005;
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
