import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./ducks";
import sagas from "./sagas";

const sagaMonitor =
    process.env.NODE_ENV === "development"
        ? console.tron.createSagaMonitor()
        : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const midlewares = [sagaMiddleware];

const composer =
    process.env.NODE_ENV === "development"
        ? compose(
              applyMiddleware(...midlewares),
              console.tron.createEnhancer()
          )
        : applyMiddleware(...midlewares);

const store = createStore(reducers, composer);

sagaMiddleware.run(sagas);

export default store;
