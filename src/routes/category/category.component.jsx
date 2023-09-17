import { useState, useEffect, Fragment } from "react";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/ProductCard/product-card.component";
import "./category.styles.scss";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/spinner.component";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {isLoading ? (
          <Spinner />
        ) : (
          products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </Fragment>
  );
};
// !useSelector runs everytime the state object has updated in the root reducer
// conclusion: if you have components that rely on asynchronously fetched data, you ll need to put in some kind of safeguard to only render the component if the data is present
export default Category;
