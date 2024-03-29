import { createStore ,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import taskReducer from "./reducers";

//combine all created reducers
const rootReducer =combineReducers({taskReducer})

export const Store= createStore(rootReducer,applyMiddleware(thunk))