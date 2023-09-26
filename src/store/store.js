// import { compose, createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; //// defaults to localStorage for web
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// const persistConfig = {
//   key: "root",
//   storage: storage,
//   blacklist: ["user"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);
// const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

// export const persistor = persistStore(store);
