import { useContext } from "react";
import { CartContext } from "../../contexts/cartItems.context";
import Button, { BUTTON_TYPE_CLASSES } from "../Button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addItemHandler = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}$</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addItemHandler}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
