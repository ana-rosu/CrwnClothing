import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //// defaults to localStorage for web
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// catch actions before they hit the reducers and log out the state (=enhancement)
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("nextState: ", store.getState());
};

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [loggerMiddleware];
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
