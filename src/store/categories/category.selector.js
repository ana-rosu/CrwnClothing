// Reselect is a library commonly used with Redux for creating memoized selectors. Memoization helps optimize selector performance by caching the results based on input selectors.
import { createSelector } from "reselect";

// Simple input selector function that extracts specific data from the Redux state (categories property).
/* state: {user: {currentUser: null}, categories: {categories: []}} */
const selectCategoriesReducer = (state) => state.categories;

// This memoized selector ensures that the transformation is only performed if the categories data from selectCategories changes.
export const selectCategoriesMap = createSelector(
  [selectCategoriesReducer],
  (categories) =>
    categories.categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categries) => categries.isLoading
);
// categories: Array(5)
// 0: {items: Array(9), title: 'Hats'}
// 1: {title: 'Jackets', items: Array(5)}
// 2: {title: 'Men', items: Array(6)}
// 3: {items: Array(8), title: 'Sneakers'}
// 4: {items: Array(7), title: 'Women'}

// A memoized selector created using createSelector takes as the first argument an array of input selectors and as the second argument a transformation function that takes the result of the input selector as its argument(s).
