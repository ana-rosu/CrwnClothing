// Reselect is a library commonly used with Redux for creating memoized selectors. Memoization helps optimize selector performance by caching the results based on input selectors.
import { createSelector } from "reselect";

// Simple input selector function that extracts specific data from the Redux state (categories property).
/* state: {user: {currentUser: null}, categories: {categories: []}} */
const selectCategoryReducer = (state) => state.categories;

//The purpose of selectCategories is to provide a memoized version of the categories data extracted from the Redux state using selectCategoryReducer. It caches the result based on changes to the Redux state. It does not perform any additional data transformation; it simply returns the categories data. The only time it will run is if the categories object that we get back from selectCategoryReducer is different.

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categories) => categories.categories
);

// The memoization ensures that this transformation is only performed if the categories data from selectCategories changes.
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
// categories: Array(5)
// 0: {items: Array(9), title: 'Hats'}
// 1: {title: 'Jackets', items: Array(5)}
// 2: {title: 'Men', items: Array(6)}
// 3: {items: Array(8), title: 'Sneakers'}
// 4: {items: Array(7), title: 'Women'}

// A memoized selector created using createSelector takes as the first argument an array of input selectors and as the second argument a transformation function that takes the result of the input selector as its argument(s).

// !! Note: I could have simplified the code using only 2 functions to achieve the same results:
// const selectCategoryReducer = (state) => state.categories.categories;

// export const selectCategoriesMap = createSelector(
//   [selectCategoriesReducer],
//   (categories) =>
//     categories.reduce((acc, category) => {
//       const { title, items } = category;
//       acc[title.toLowerCase()] = items;
//       return acc;
//     }, {})
// );
// The reason for having three functions in the original code is for flexibility and consistency with common Redux patterns
