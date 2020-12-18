import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
<<<<<<< HEAD
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
=======
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
<<<<<<< HEAD
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
=======
    composeEnhancers(applyMiddleware(thunk))
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
  );
}
