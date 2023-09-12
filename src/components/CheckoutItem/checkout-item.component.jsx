import { useContext } from "react";
import { CartContext } from "../../contexts/cartItems.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, decrementItemFromCart, removeItemFromCart } =
    useContext(CartContext);

  const addItemHandler = () => addItemToCart(cartItem);
  const decrementItemHandler = () => decrementItemFromCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

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
