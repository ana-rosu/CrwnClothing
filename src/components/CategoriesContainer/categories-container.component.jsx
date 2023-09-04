import "./categories-container.styles.scss";
import CategoryItem from "../CategoryItem/category-item.component";

const CategoriesContainer = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesContainer;
