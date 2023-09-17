import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading } from "../../store/categories/category.selector";
import Spinner from "../../components/Spinner/spinner.component";
import CategoryPreview from "../../components/CategoryPreview/category-preview.component";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
